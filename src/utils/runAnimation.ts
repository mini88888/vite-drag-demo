interface AnimationsItem {
  animationTime: number;
  value: string;
  isLoop: boolean
}

export async function runAnimation($el: HTMLElement, animations: Array<AnimationsItem> = []) {
  const play = (animation: AnimationsItem) => new Promise<void>(resolve => {
    const { animationTime, value = '', isLoop } = animation
    $el.style.setProperty('--time', animationTime + 's')
    $el.classList.add(value, 'animated', utilsHandle(isLoop))
    const removeAnimation = () => {
      $el.removeEventListener('animationend', removeAnimation)
      $el.removeEventListener('animationcancel', removeAnimation)
      $el.classList.remove(value, 'animated', utilsHandle(isLoop))
      $el.style.removeProperty('--time')
      resolve()
    }

    $el.addEventListener('animationend', removeAnimation)
    $el.addEventListener('animationcancel', removeAnimation)
  })

  for (let i = 0, len = animations.length; i < len; i++) {
    await play(animations[i])
  }
}

function utilsHandle(isLoop: AnimationsItem['isLoop']) {
  return isLoop ? 'infinite' : 'no-infinite'
}
