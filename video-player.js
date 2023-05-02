const containers = document.querySelectorAll("div.ia21-player")
            
            containers.forEach (container => {
                const controllers = container.querySelector("controllers")
                const btPlayPause = container.querySelector("button.play-pause")
                const video = container.querySelector("video")
                const timeline = container.querySelector(".dragbar.timeline")
                const timelineDrag = timeline.querySelector(".draggable")
                const timer = container.querySelector(".timer")
                const volume = container.querySelector(".volume")
                const btVolume = container.querySelector(".volume.button")
                const volumeDrag = container.querySelector(".dragbar.volume")
                const btFullscreem = container.querySelector(".fullscreen.button")


                let isVideoFullscreen = false
                let previousVolume = 0

                // video.currentTime = 59

                volume.style.columnGap = "0em"

                btPlayPause.addEventListener("click", () => {
                    
                    if (video.paused) { 
                        video.play()
                        // controllers.style.setProperty("visibility", "hidden")
                        
                        console.log("started playing")

                        
                        btPlayPause.innerText = btPlayPause.dataset.pauseIcon
                        
                        console.log("Waiting")
                        
                        async function wait3Seconds() {
                            console.log("time passing")
                            await new Promise(resolve => setTimeout(resolve, 3000));
                            controllers.style.opacity = "0"
                            controllers.style.visibility = "hidden"
                            console.log("time passed")

                        }
                        wait3Seconds()

                        console.log("hidding controllers")
                        return
                    }

                    video.pause()
                    console.log("showing controllers")
                    btPlayPause.innerText = btPlayPause.dataset.playIcon
                    controllers.style.visibility = "visible"
                    controllers.style.opacity = "1"


                })

                volume.addEventListener("mouseover", () => {
                    console.log("Volume hovered")
                    volumeDrag.style.visibility = "visible"
                    volume.style.columnGap = "1em"
                    volumeDrag.style.paddingRight = "2em"
                    volumeDrag.style.paddingLeft = "2em"
                    // volumeDrag.style.paddingRight = "0px"
                })

                volume.addEventListener("mouseout", () => {
                    console.log("Volume un-hovered")
                    volume.style.columnGap = "0em"
                    volumeDrag.style.paddingRight = "0em"
                    volumeDrag.style.paddingLeft = "0em"
                    volumeDrag.style.visibility = "hidden"
                })

                btFullscreem.addEventListener("click", () => {
                    console.log(`isVideoFullscreen: ${isVideoFullscreen}`)
                
                if (isVideoFullscreen) {
                    document.exitFullscreen()
                    isVideoFullscreen = false
                    return
                }

                video.webkitRequestFullscreen()
                isVideoFullscreen = true

            });

                btVolume.addEventListener("click", () => {
                    if (video.volume == 0) {
                        video.volume = previousVolume
                        btVolume.innerText = btVolume.dataset.on
                        return
                    }
                    
                    previousVolume = video.volume
                    video.volume = 0
                    btVolume.innerText = btVolume.dataset.mute
                })


                video.addEventListener("timeupdate", () => {
                    const percent = (video.currentTime / video.duration) * 100
                    const dragOffset = (percent / 100) / 2

                    const seconds = Math.floor(video.currentTime % 60)
                    const minutes = Math.floor((video.currentTime / 60) % 60)
                    const hours = Math.floor(video.currentTime / 3600)

                    timelineDrag.style.setProperty("--percent", `${percent}%`)
                    timelineDrag.style.setProperty("--dragOffset", `${dragOffset}rem`)
                    
                    // console.log(`segundos video.currentTime % 60: ${video.currentTime % 60}`)
                    
                    timer.innerText = `${hours > 0 ? hours+':' : ''}${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`


            })

            video.addEventListener("click", () => {
                btPlayPause.click()
            })

            video.addEventListener("dblclick", () => {
                console.log("Double Clicked")
                console.log(`isVideoFullscreen: ${isVideoFullscreen}`)
                
                if (isVideoFullscreen) {
                    document.exitFullscreen()
                    isVideoFullscreen = false
                    return
                }
                    video.webkitRequestFullscreen()
                    isVideoFullscreen = true
            });

            document.addEventListener("keydown", (e) => {
                
                if (e.key.toLowerCase() === 'f') {
                    console.log("Payed Respect")
                    if (isVideoFullscreen) {
                        document.exitFullscreen()
                        isVideoFullscreen = false
                        return
                    }
    
                    video.webkitRequestFullscreen()
                    isVideoFullscreen = true
                    
                }

                if (e.key.toLowerCase() === 'm') {
                    btVolume.click()
                }

                if (e.code === 'Space') {
                    btPlayPause.click()
                }
            })

            video.addEventListener("ended", () => {
                btPlayPause.innerText = btPlayPause.dataset.startIcon
            })



            
            const dragbars = container.querySelectorAll(".dragbar")
            
            dragbars.forEach(dragbar => {
                const dragabble = dragbar.querySelector(".draggable")
                
                if (dragbar.classList.contains("volume")) {
                    dragabble.style.setProperty("--percent", "100%")
                    dragabble.style.setProperty("--dragOffset", "0.5rem")
                    }
                
                dragbar.addEventListener("click", ev => {
                    const width = Math.floor(dragbar.getBoundingClientRect().width)
                    const index = (ev.offsetX / width)
                    const dragOffset = index / 2
                    const percent = index * 100
                    dragabble.style.setProperty("--percent", `${percent}%`)
                    dragabble.style.setProperty("--dragOffset", `${dragOffset}rem`)
                    
                    if (dragbar.classList.contains("timeline")) {
                        video.currentTime = video.duration * index
                        
                        if (btPlayPause.innerText == btPlayPause.dataset.startIcon) btPlayPause.innerText = btPlayPause.dataset.pauseIcon
                        // if (video.paused) btPlayPause.click()
                        // console.log("Timeline existe")
                        return
                    }
                    
                    if (dragbar.classList.contains("volume")) {
                        video.volume = index
                        // console.log("Som existe")
                        btVolume.innerText = btVolume.dataset.on
                        console.log(`volume: ${index}`)
                        return
                    }

                })
            })

        })