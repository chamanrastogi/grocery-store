export function unsplash(photoId: string, width = 600): string {
  return `https://images.unsplash.com/photo-${photoId}?w=${width}&q=70&auto=format&fit=crop`
}

export function unsplashCat(photoId: string): string {
  return unsplash(photoId, 480)
}