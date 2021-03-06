import { Override, useAnimation, Data } from "framer"
import { useState } from "react"

const livedata = Data({
    controls: null,
    message: "",
    author: "",
    avatar: "",
    opacity: 1,
    y: 330,
    transition: {
        type: "tween",
        duration: 0.6,
        ease: [0.12, 0.23, 0.24, 1.23],
    },
})

export function ListItem(props): Override {
    const controls = useAnimation()
    livedata.controls = controls as any

    const [color, setColor] = useState(props.background)

    return {
        whileHover: {
            scale: 1.02,
        },
        animate: { background: color },
        transition: { duration: 0.2 },

        async onTapStart() {
            setColor("#183A68")
            livedata.opacity = 1
        },

        async onTap() {
            await controls.start({
                y: 330,
            })
            livedata.y = 0
            livedata.message = props.chatMessage
            livedata.author = props.authorName
            livedata.avatar = props.avatar
            controls.start({
                y: 0,
            })
        },
    }
}

export function Clear(): Override {
    return {
        whileHover: {
            scale: 1.05,
        },
        onTap() {
            livedata.y = 330
        },
    }
}

export function LiveMessage(): Override {
    return {
        y: 330,
        animate: livedata.controls,
        transition: livedata.transition,
        chatMessage: livedata.message,
        authorName: livedata.author,
        avatar: livedata.avatar,
    }
}

export function Streamable(): Override {
    return {
        animate: { y: livedata.y },
        transition: {
            type: "tween",
            duration: 0.6,
            ease: [0.12, 0.23, 0.24, 1.23],
        },
    }
}
