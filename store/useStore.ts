import { create } from 'zustand'

type CameraMode = 'overview' | 'focused'

interface PortfolioState {
    // Camera mode for 3D scene
    cameraMode: CameraMode
    setCameraMode: (mode: CameraMode) => void

    // Audio state
    isMuted: boolean
    toggleMute: () => void
    setIsMuted: (muted: boolean) => void
}

export const useStore = create<PortfolioState>((set) => ({
    // Initial state - overview mode
    cameraMode: 'overview',

    // Audio state
    isMuted: true,
    toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
    setIsMuted: (muted: boolean) => set({ isMuted: muted }),

    // Set camera mode
    setCameraMode: (mode) => set({ cameraMode: mode }),
}))
