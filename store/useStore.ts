import { create } from 'zustand'

type CameraMode = 'overview' | 'focused'

interface PortfolioState {
    // Camera mode for 3D scene
    cameraMode: CameraMode
    setCameraMode: (mode: CameraMode) => void
}

export const useStore = create<PortfolioState>((set) => ({
    // Initial state - overview mode
    cameraMode: 'overview',

    // Set camera mode
    setCameraMode: (mode) => set({ cameraMode: mode }),
}))
