import { ref, shallowRef, triggerRef } from "vue"
import { useMouse, useMousePressed, useIntervalFn } from "@vueuse/core"

export const useMouseTrack = ({buttonPositions}: {buttonPositions: any}) => {
    const { x, y } = useMouse({ touch: false })
    const track = shallowRef<[number,number, null | boolean, null | string, any][]>([])
    const { pressed } = useMousePressed()

    useIntervalFn(() => track.value.push([x.value,y.value, pressed.value, null, buttonPositions.value]), 100)
    useIntervalFn(() => triggerRef(track), 1000)

    const capture = (t: string) => track.value.push([x.value,y.value, pressed.value, t, buttonPositions.value])
    return {
        track,
        capture,
        x,
        y
    }
}