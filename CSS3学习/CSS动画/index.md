# CSS3动画

`CSS3`可以创建动画，它可以取代许多网页动画图像，`Flash`动画和`JavaScript`实现的效果。

## CSS3 @keyframes 规则

`@keyframes`规则是创建动画。

`@keyframes`规则内指定一个`CSS`样式和动画逐步从目前的样式更改为新的样式。

```css
 @keyframes myBox {
        from {
            background: red;
        }

        to {
            background: blue;
        }
    }

div {
    width: 100px;
    height: 100px;
    background: red;
    animation: 1s myBox;
    transition: 1s 1s ease-in;
}

div:hover {
    width: 200px;
    height: 200px;
}
```

当在`@keyframes`创建动画，把它绑定到一个选择器，否者就不会有任何效果。

指定至少这两个`CSS3`的动画属性绑定向一个选择器：

- 规定动画的名称。
- 规定动画的时长。

上面例子中，将动画绑定在`div`上，时长为1s。

## CSS3动画是什么

动画是使元素从一个样式逐渐变为另外一种样式的效果。

可以改变任意多的样式和任意多的次数。

使用百分比来规定变化发送的时间，或者用关键字`from`和`to`，等同于`0%`和`100%`。

`0%`是动画开始的时候，`100%`是动画结束的时候。

0% 是动画的开始，100% 是动画的完成。

为了得到最佳的浏览器支持，您应该始终定义 0% 和 100% 选择器。

### 改变背景颜色

```css
 @keyframes myBox {
    0% {
        background: red;
    }

    25% {
        background: black;
    }

    50% {
        background: yellow;
    }

    75% {
        background: green;
    }

    100% {
        background: red;
    }
}

div {
    width: 100px;
    height: 100px;
    background: red;
    animation: 6s myBox;
    transition: 1s 1s ease-in;
}

div:hover {
    width: 200px;
    height: 200px;
}
```

效果：

![](https://raw.githubusercontent.com/dpy0912/PicGo/main/fix-dir/H/gif%E5%8A%A8%E7%94%BB/2022/02/14/18-56-54-ec1e063a5ce34f555d2e8bc53540682f-%E5%8A%A8%E7%94%BB3-1b0f4.gif)

### 改变背景颜色和位置

```css
 @keyframes myBox {
    0% {
        background: red;
        left: 0px;
        top: 0px;
    }

    25% {
        background: black;
        left: 200px;
        top: 0px;
    }

    50% {
        background: yellow;
        left: 200px;
        top: 200px;
    }

    75% {
        background: green;
        left: 0px;
        top: 200px;
    }

    100% {
        background: red;
        left: 0px;
        top: 0px;
    }
}

div {
    width: 100px;
    height: 100px;
    background: red;
    animation: 6s myBox;
    transition: 1s 1s ease-in;
    position: relative;
}

div:hover {
    width: 200px;
    height: 200px;
}
```

![](https://raw.githubusercontent.com/dpy0912/PicGo/main/fix-dir/H/gif%E5%8A%A8%E7%94%BB/2022/02/14/18-56-54-ec1e063a5ce34f555d2e8bc53540682f-%E5%8A%A8%E7%94%BB3-1b0f4.gif)

## CSS3动画属性

下面列出`@keyframes`规则和所有动画属性。

- @keyframes：规定动画。
- animation：所有动画属性的简写属性。
- animation-name：规定@keyframes动画的名称。
- animation-duration：规定一个动画完成的周期所花费的时间，单位是秒或者毫秒，默认为0。
- animation-timing-function：规定动画的速度曲线，默认是`ease`。
- animation-fill-mode：规定当动画不播放时（当动画完成的时候，或者动画有一个延迟未开播的时候），要应用的元素的样式。
- animation-delay：规定动画何时开始，默认为0。
- animation-iteration-count：规定动画被播放的次数，默认为1。
- animation-direction：规定动画是否在下一周期逆向播放，默认是`normal`。
- animation-play-state：规定动画是否正在运行或者暂停，默认值为`running`。

```css
 @keyframes myBox {
    0% {
        background: red;
        left: 0px;
        top: 0px;
    }

    25% {
        background: black;
        left: 200px;
        top: 0px;
    }

    50% {
        background: yellow;
        left: 200px;
        top: 200px;
    }

    75% {
        background: green;
        left: 0px;
        top: 200px;
    }

    100% {
        background: red;
        left: 0px;
        top: 0px;
    }
}

div {
    width: 100px;
    height: 100px;
    background: red;
    position: relative;
    animation-name: myBox;
    animation-duration: 6s;
    animation-timing-function: ease-in;
    animation-delay: 2s;
    animation-fill-mode: div;
    animation-iteration-count: 2;
    animation-direction: alternate;
    animation-play-state: running;
}
```