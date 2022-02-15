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

### @keyframes

使用`@keyframes`规则，可以创建动画。

创建动画需要逐步改变从一个CSS样式设定到另外一个。

在创建动画过程中，你可以更改CSS样式的设定多次。

指定变化时发生时使用%，或者用关键字`from`和`to`，这与0%和100%是相同的。

0%表示的是开始动画，100%表示的是结束的动画。

为了获得最佳的浏览器支持，应该始终定义为0%和100%的选择器。

`@keyframes`语法如下：

```css
@keyframes animationname {
    keyframes-selector {
        css-style;
    }
}
```

- animationname：必需，定义animation的名称。
- keyframes-selector：必需，动画持续的百分比，值的范围为：0-100%，from和to。
- css-style：必需，一个或者多个合法的CSS样式属性。

### animation属性

使用简写属性`animation`绑定在一个`div`上。

```css
div {
    animation: 1s infinite;
}
```

#### 语法

```css
animation: name duration timing-function delay iteration-count direction fill-mode play-state
```

- animation-name：规定@keyframes动画的名称。
- animation-duration：规定一个动画完成的周期所花费的时间，单位是秒或者毫秒，默认为0。
- animation-timing-function：规定动画的速度曲线，默认是`ease`。
- animation-fill-mode：规定当动画不播放时（当动画完成的时候，或者动画有一个延迟未开播的时候），要应用的元素的样式。
- animation-delay：规定动画何时开始，默认为0。
- animation-iteration-count：规定动画被播放的次数，默认为1。
- animation-direction：规定动画是否在下一周期逆向播放，默认是`normal`。
- animation-play-state：规定动画是否正在运行或者暂停，默认值为`running`。
- initial：设置属性为其默认值。
- inherit：从父元素继承属性。

### animation-name属性

为`@keyframes`动画指定一个名称。

```css
animation-name：myBox；
```

#### 语法

```css
animation-name: keyframename|none;
```

- keyframename：指定绑定选择器的关键帧的名称。
- none：指定没有动画。

### animation-duration属性

`animation-duration`属性是设置动画在多少时间完成。

```css
animation-duration: 1s;
```

#### 语法

```css
animation-duration: time;
```

- time：时指定动画播放完成所需要的时间，默认值为0。

### animation-timing-function属性

`animation-timing-function`属性表示从开始到结束动画的速度。

```css
animation-timing-function: ease;
```

#### 语法

```css
animation-timing-function：value;
```

`animation-timing-function`使用数学函数，称为三次贝塞尔曲线，速度曲线，使用此函数，可以自定义值，或者使用预先定义的值。

- linear：规定以相同的速度开始至结束的过渡效果，等于（cubic-bezier(0,0,1,1)）。
- ease：规定慢速开始，然后变快，然后慢速结束的过渡效果（cubic-bezier(0.25,0.1,0.25,1)）。
- ease-in：规定以慢速度开始的过渡效果（等于 cubic-bezier(0.42,0,1,1)）。
- ease-out：规定以慢速度结束的过渡效果（等同于cubic-bezier(0,0,0.58,1)）。
- ease-in-out：规定以慢速度开始和结束的过渡效果（等同于cubic-bezier(0.42,0,0.58,1)）。
- steps(int,start|end)：指定了时间函数的间隔数量，有两个参数，第一个参数指定函数的间隔数，该参数是一个正整数，第二个参数是可选的，表示动画从时间段的开头连续还是结尾连续，
  - start：表示直接开始。
  - end：表示戛然而止，默认值。
- cubic-bezier(n,n,n,n)：在 cubic-bezier 函数中定义自己的值。可能的值是 0 至 1 之间的数值。

### animation-fill-mode属性

`animation-fill-mode`把物体动画从一个地方移动到另外一个地方，并且让它停留在哪儿。

```css
animation-fill-mode：forwords;
```

`animation-fill-mode`属性规定当动画不播放时，要应用到元素样式。

默认情况下，`CSS`动画的第一个关键帧播放完之前不会影响元素，在最后一个关键帧完成后停止影响元素。`animation-fill-mode`属性可重写该行为。

#### 语法

```css
animation-fill-mode: none | forwards | backwards | both | initial | inherit
```

- none：默认值，动画在动画执行之前和之后不会应用到任何样式到目标元素。
- forwards：在动画结束后（由animation-iteration-count决定），动画将应用到该属性。
- backwards：动画将应用在`animation-delay`定义期间启动动画的第一次迭代的关键帧中定义的属性值，这些都是from关键帧中的值（当`animation-direction`为`noraml`或者`attemate`时）或者`to`关键帧中的值（当`nimation-direction`为 "reverse" 或 "alternate-reverse" 时）。
- both：动画遵循`forwards`和`backwards`规则，也就是说，动画会在两个方向上拓展动画属性。
- initial：设置属性为其默认值。
- inherit：从父元素继承属性。

### animation-delay属性

`animation-delay`属性定义动画声明时候开始。

`animation-delay`值单位可以是秒（s）或毫秒（ms）。

允许负值，-2s 使动画马上开始，但跳过 2 秒进入动画。

```css
animation-delay: 1s;
```

#### 语法

```css
animation-delay: time;
```

- time：可选。定义动画开始前等待的时间，以秒或毫秒计。默认值为0。

### animation-iteration-count属性

`animation-iteration-count`属性定义动画播放的次数。

```css
animation-iteration-count: 2;
```

#### 语法

```css
animation-iteration-count: value;
```

- n：一个数字，定义动画应该播放的次数。
- infinite：指定动画应该播放无数次。

### animation-direction属性

`animation-direction`属性定义是否循环交替反向播放动画。

如果动画被设置为只播放一次，该属性将不起作用。

#### 语法

```css
animation-direction: normal|reverse|alternate|alternate-reverse|initial|inherit;
```

- normal：默认值，动画按照正常播放。
- reverse：动画反向播放。
- alternate：动画在奇数正向播放，在偶数反向播放。
- alternatte-reverse：动画在奇数方向播放，在偶数正向播放。
- initial：该属性为它的默认值。
- inherit：从父元素继承该属性。

### animation-paly-state属性

`animation-play-state`属性指定动画是否正常运行或者已暂停。

在`JavaScript`中使用此属性在一个周期中暂停动画。

```css
animation-play-state: paused | running;
```

#### 语法

```css
animation-play-state: paused | running;
```

- paused：指定暂停动画。
- runnind：指定正在运行的动画。