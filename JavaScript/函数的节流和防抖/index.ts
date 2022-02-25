function debounce<Return>(
    fn: (...params: any[]) => Return,
    wait: number, // 等待时间
    immediate: boolean // 是否立即执行 
): Exectutor<Return> {
    const now: () => number = Date.now.bind(Date)
    let lastTime: number = 0
    let timer: number = null
    let params: IArguments = null
    let _this: Function | null = null

    function later(): void {
        const nowTime: number = now()
        if (nowTime - lastTime < wait) {
            const remainTime = wait - (nowTime - lastTime)
            timer = setTimeout(later, remainTime)
        } else {
            debouncer.result = fn.apply(_this, params)
            timer = null
            _this = null
            params = null
        }
    }

    function execute(): (Return | null) {
        lastTime = now();
        _this = this;
        params = arguments;
        try {
            if (immediate && timer === null) {
                // 立刻执行一次
                debouncer.result = fn.apply(_this, params);
            }
            return debouncer.result;
        } finally {
            if (timer === null) {
                // 加入时间队列，等待执行 
                timer = setTimeout(later, wait);
            }
        }
    }
    const debouncer: Exectutor<Return> = {
        execute,
        result: null,
    }
    return debouncer
}


