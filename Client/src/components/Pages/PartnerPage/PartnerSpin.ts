
// comentting out because of production when run npm run build error occurs here because applyTransform is not defined in scope (yuri)

export default function spinLoop(ref: any){
    ref.current.y = ref.current.y + 0.05;
    // applyTransform is not defined in scope; comment out or define it
    // applyTransform()
    requestAnimationFrame(spinLoop)

}

