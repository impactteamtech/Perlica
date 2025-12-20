

import React from 'react';

export default function spinLoop(ref){
    ref.current.y = ref.current.y + 0.05;
    applyTransform()
    requestAnimationFrame(spinLoop)

}

