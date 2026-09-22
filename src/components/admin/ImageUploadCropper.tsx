'use client';

// Composant d'upload + recadrage réutilisé par les étapes Page d'accueil, Menu
// et Programme (et toute étape similaire ajoutée plus tard) — une seule
// implémentation du crop, pas une par section.
//
// Pourquoi un recadrage à l'upload : un visuel Canva importé tel quel, dans son
// ratio d'origine, laisse des bandes noires en haut/bas sur le mini-site mobile
// dès que son ratio ne correspond pas exactement au cadre d'affichage. On force
// donc un recadrage au ratio cible (9:16 par défaut, façon "story" Instagram)
// avant sauvegarde, pour garantir un rendu plein cadre quel que soit le fichier
// importé.
//
// Deux champs sont sauvegardés : `image` (le résultat déjà recadré, utilisé pour
// l'affichage) et `source` (le fichier importé, recompressé mais PAS recadré) —
// pour permettre de rouvrir l'outil et changer le cadrage plus tard sans repartir
// d'un fichier déjà rogné (on perdrait alors les parties coupées la première fois).

import { useRef, useState, useCallback } from 'react';
import Cropper, { Area, Point } from 'react-easy-crop';
import { Upload, X, Crop as CropIcon } from 'lucide-react';
import { compressDataURL } from '@/lib/admin/utils';

interface ImageUploadCropperProps {
  /** Résultat déjà recadré, affiché tel quel sur le mini-site. Vide si aucun visuel. */
  image: string;
  /** Fichier importé avant recadrage, conservé pour pouvoir rouvrir l'outil et changer le cadrage. */
  sourceImage?: string;
  onChange: (next: { image: string; source: string }) => void;
  onRemove: () => void;
  /** Texte d'aide affiché au-dessus de la zone d'import (spécifique à chaque section). */
  hint: string;
  /** Texte alt de l'image affichée (accessibilité). */
  alt: string;
  /** Hauteur de la zone vide (avant import), en px. */
  emptyHeight?: number;
  /** Ratio cible du recadrage — 9:16 (vertical mobile) par défaut. */
  aspect?: number;
}

function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(reader.error ?? new Error('Lecture du fichier impossible'));
    reader.onload = () => resolve(reader.result as string);
    reader.readAsDataURL(file);
  });
}

function loadImageElement(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Image illisible'));
    img.src = src;
  });
}

/** Découpe la zone sélectionnée (en pixels de l'image d'origine) et la redessine
 *  à une résolution de sortie fixe — garantit un rendu plein cadre 9:16 sans
 *  bande noire, quel que soit le fichier importé. */
async function cropToDataURL(imageSrc: string, area: Area, outputWidth = 1080, outputHeight = 1920): Promise<string> {
  const img = await loadImageElement(imageSrc);
  const canvas = document.createElement('canvas');
  canvas.width = outputWidth;
  canvas.height = outputHeight;
  const ctx = canvas.getContext('2d');
  if (!ctx) return imageSrc;
  ctx.drawImage(img, area.x, area.y, area.width, area.height, 0, 0, outputWidth, outputHeight);
  return canvas.toDataURL('image/jpeg', 0.85);
}

export default function ImageUploadCropper({
  image, sourceImage, onChange, onRemove, hint, alt, emptyHeight = 224, aspect = 9 / 16,
}: ImageUploadCropperProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [pendingSrc, setPendingSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [working, setWorking] = useState(false);

  const onCropComplete = useCallback((_area: Area, areaPixels: Area) => {
    setCroppedAreaPixels(areaPixels);
  }, []);

  async function handleFileSelect(files: FileList | null) {
    const file = files?.[0];
    if (!file) return;
    if (!['image/png', 'image/jpeg'].includes(file.type)) return;
    const dataUrl = await readFileAsDataURL(file);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppedAreaPixels(null);
    setPendingSrc(dataUrl);
  }

  function openRecrop() {
    // On repart du fichier importé (pas du résultat déjà rogné) quand il est
    // disponible, pour ne pas perdre les parties coupées lors du premier crop.
    // À défaut (événement créé avant l'ajout de cette fonctionnalité), on repart
    // du visuel actuel.
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppedAreaPixels(null);
    setPendingSrc(sourceImage || image);
  }

  function closeCropper() {
    setPendingSrc(null);
  }

  async function confirmCrop() {
    if (!pendingSrc || !croppedAreaPixels) return;
    setWorking(true);
    try {
      const [croppedResult, compressedSource] = await Promise.all([
        cropToDataURL(pendingSrc, croppedAreaPixels),
        // Source recompressée (pas recadrée) pour rester disponible au recadrage
        // suivant, sans peser trop lourd dans le stockage.
        compressDataURL(pendingSrc, { maxWidth: 1600, maxHeight: 1600, quality: 0.85 }),
      ]);
      onChange({ image: croppedResult, source: compressedSource });
      setPendingSrc(null);
    } finally {
      setWorking(false);
    }
  }

  return (
    <div>
      {image ? (
        <div className="relative rounded-2xl overflow-hidden border" style={{ borderColor: 'rgba(26,15,8,0.1)' }}>
          <img src={image} alt={alt} className="w-full object-cover" style={{ aspectRatio: '9 / 16', maxHeight: 320 }} />
          <button
            onClick={onRemove}
            className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/50 flex items-center justify-center">
            <X size={12} className="text-white" />
          </button>
          <div className="absolute bottom-2 right-2 flex gap-1.5">
            <button
              onClick={openRecrop}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-black/50 text-white text-[11px]">
              <CropIcon size={11} /> Recadrer
            </button>
            <button
              onClick={() => fileRef.current?.click()}
              className="px-3 py-1.5 rounded-lg bg-black/50 text-white text-[11px]">
              Remplacer
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => fileRef.current?.click()}
          className="w-full rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-2 transition-colors hover:border-[#B85C28]"
          style={{ height: emptyHeight, borderColor: 'rgba(26,15,8,0.12)', background: 'white' }}>
          <Upload size={20} className="text-[#C4A882]" />
          <p className="text-[12px] font-medium text-[#1A0F08]">Importer le visuel</p>
          <p className="text-[10px] text-[#C4A882]">PNG ou JPG — recadrage au format vertical à la validation</p>
        </button>
      )}
      <p className="text-[11px] text-[#9B7A56] mt-3">{hint}</p>
      <input ref={fileRef} type="file" accept="image/png,image/jpeg" className="hidden"
        onChange={e => handleFileSelect(e.target.files)} />

      {pendingSrc && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" style={{ background: 'rgba(10,5,2,0.75)' }}>
          <div className="w-full max-w-sm rounded-2xl overflow-hidden" style={{ background: '#1A0F08' }}>
            <div className="relative w-full" style={{ height: 420, background: '#0A0502' }}>
              <Cropper
                image={pendingSrc}
                crop={crop}
                zoom={zoom}
                aspect={aspect}
                cropShape="rect"
                showGrid
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>
            <div className="p-4 space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-[10px] text-white/50 uppercase tracking-wide">Zoom</span>
                <input
                  type="range" min={1} max={3} step={0.01} value={zoom}
                  onChange={e => setZoom(parseFloat(e.target.value))}
                  className="flex-1 accent-[#B85C28]"
                />
              </div>
              <p className="text-[10px] text-white/40">Déplacez et zoomez l&apos;image pour choisir la partie visible sur le mini-site.</p>
              <div className="flex gap-2 pt-1">
                <button
                  onClick={closeCropper}
                  className="flex-1 py-2.5 rounded-xl text-[12px] font-medium text-white/70 border border-white/15 hover:bg-white/5 transition-colors">
                  Annuler
                </button>
                <button
                  onClick={confirmCrop}
                  disabled={working || !croppedAreaPixels}
                  className="flex-1 py-2.5 rounded-xl text-[12px] font-medium text-white transition-opacity disabled:opacity-50"
                  style={{ background: '#B85C28' }}>
                  {working ? 'Traitement…' : 'Valider le cadrage'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
