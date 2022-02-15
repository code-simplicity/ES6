# CSS3过渡

## CSS Transition

### Transition基本用法

在`CSS3`中引入`transition`（过渡）这个概念。

下面这个演示的是当鼠标放置于略缩图之上，略缩图会迅速变大，这里略缩图的变大是瞬间实现的。

```html
img {
    width: 80px;
    height: 80px;
}

img:hover {
    width: 400px;
    height: 400px;
}

<img src="https://raw.githubusercontent.com/dpy0912/PicGo/main/fix-dir/Roaming/picgo/2022/02/13/12-10-02-93988dbb28a44ac7c3780fc769fae7bd-20220213121002-4c5f7.png" alt="">
```

效果如下：

![](https://raw.githubusercontent.com/dpy0912/PicGo/main/fix-dir/D/%E6%A1%8C%E9%9D%A2/2022/02/14/14-19-55-286ded10066e37a377e1bc80b950dda6-%E5%8A%A8%E7%94%BB-84692.gif)

`transition`作用在于指定状态变化所需的时间。

下面当鼠标放置在略缩图上的时候，略缩图放大的过程需要1s完成。

```html
    <style>
        img {
            width: 80px;
            height: 80px;
            transition: 1s;
        }

        img:hover {
            width: 400px;
            height: 400px;
        }
    </style>

    <img src="https://raw.githubusercontent.com/dpy0912/PicGo/main/fix-dir/Roaming/picgo/2022/02/13/12-10-02-93988dbb28a44ac7c3780fc769fae7bd-20220213121002-4c5f7.png"
        alt="">
```

效果如下：

![](https://raw.githubusercontent.com/dpy0912/PicGo/main/fix-dir/H/gif%E5%8A%A8%E7%94%BB/2022/02/14/14-29-55-d86819592a65ea6247ffc498bd7d0a61-%E5%8A%A8%E7%94%BB-04847.gif)

还可以指定`transition`适用的属性，比如只适用于`height`，这样就只有`height`属性变化需要1s完成，其他变化还是瞬间完成。

```html
    <style>
        img {
            width: 80px;
            height: 80px;
            transition: 1s height;
        }

        img:hover {
            width: 400px;
            height: 400px;
        }
    </style>

    <img src="https://raw.githubusercontent.com/dpy0912/PicGo/main/fix-dir/Roaming/picgo/2022/02/13/12-10-02-93988dbb28a44ac7c3780fc769fae7bd-20220213121002-4c5f7.png"
        alt="">
```

效果如下：

![](https://raw.githubusercontent.com/dpy0912/PicGo/main/fix-dir/H/gif%E5%8A%A8%E7%94%BB/2022/02/14/14-33-20-cdb0397a3ccb15fe200d8e49a99c7783-%E5%8A%A8%E7%94%BB1-6902f.gif)

### transition-delay

在同一行`transition`语句中，可以分别指定多个属性。

```html
    <style>
        img {
            width: 80px;
            height: 80px;
            transition: 1s height, 1s width;
        }

        img:hover {
            width: 400px;
            height: 400px;
        }
    </style>

    <img src="https://raw.githubusercontent.com/dpy0912/PicGo/main/fix-dir/Roaming/picgo/2022/02/13/12-10-02-93988dbb28a44ac7c3780fc769fae7bd-20220213121002-4c5f7.png"
        alt="">
```

但是，这样一来，height和width的变化是同时进行的，跟不指定它们没有差别.

效果如下：

![](https://raw.githubusercontent.com/dpy0912/PicGo/main/fix-dir/H/gif%E5%8A%A8%E7%94%BB/2022/02/14/14-29-55-d86819592a65ea6247ffc498bd7d0a61-%E5%8A%A8%E7%94%BB-04847.gif)

如果是有这样一个要求，首先就是`height`先发生变化，然后再让`width`发生变化，就需要为`width`指定一个`delay`参数。

```html
    <style>
        img {
            width: 80px;
            height: 80px;
            transition: 1s height, 1s 1s width;
        }

        img:hover {
            width: 400px;
            height: 400px;
        }
    </style>

    <img src="https://raw.githubusercontent.com/dpy0912/PicGo/main/fix-dir/Roaming/picgo/2022/02/13/12-10-02-93988dbb28a44ac7c3780fc769fae7bd-20220213121002-4c5f7.png"
        alt="">
```

效果如下：

![](https://raw.githubusercontent.com/dpy0912/PicGo/main/fix-dir/H/gif%E5%8A%A8%E7%94%BB/2022/02/14/14-47-34-65bc88613dc42aec2e87813d42cd9cdb-%E5%8A%A8%E7%94%BB2-bfd5e.gif)

`delay`真正的意义在于。它指定了动画发生的顺序，使得多个不同的`transition`可以连接在一起，形成复杂的效果。

### transition的各项属性

`transition`的完整写法如下。下面的写法其实是一个简写形式。

```css
img {
    transition: 1s 1s height ease;
}
```

可以将上面的简写形式单独定义成各个属性。

```css
img {
    transition-property: height;
    transition-duration: 1s;
    transition-delay: 1s;
    transition-timing-function: ease; 
}

// 等同于

img {
    transition: 1s 1s height ease;
}
```

#### transition-property

`transition-property`指定`nametransition`效果（transition效果时将会启动指定的CSS属性的变化）。

一个转场效果通常是用户将鼠标悬停在一个元素上。

`transition-property`始终指向`transition-duration`属性，否者持续时间为0，`transition`不会有任何效果。

```css
img {
    transition-property: none | all | property;
}
```

`transition-property`可以设置三个值，分别是`none`，`all`，`property`。

- none：没有属性会获得过渡效果。
- all：所有属性都将获得过渡效果。
- property：定义应用过渡的CSS属性名称和列表，列表以逗号分隔。

#### transition-duration

`transiton-duration`属性规定完成过渡所需要的时间（以秒或者毫秒计）。

```css
img {
    transition-duration: 1s;
}
```

`transition-duration`设置的值为time。

- time：规定完成过渡所需要的时间（以秒或者毫秒计）。默认值为0，意味着不会有效果。

#### transition-delay

`transition-delay`属性指定何时将开始切换效果，值是指以秒为单位（S）或毫秒（ms）。

```css
img {
    transition-delay: 1s;
}
```

`transition-delay`设置的值为time。

- time：指定秒或毫秒数之前要等待切换效果开始。

#### transition-timing-function

`transition-timing-function`称为过渡状态变化速度，默认不是匀速的，而是逐渐放慢，这叫做`ease`。

```html
    <style>
        img {
            width: 80px;
            height: 80px;
            transition: 1s ease;
        }

        img:hover {
            width: 400px;
            height: 400px;
        }
    </style>

    <img src="https://raw.githubusercontent.com/dpy0912/PicGo/main/fix-dir/Roaming/picgo/2022/02/13/12-10-02-93988dbb28a44ac7c3780fc769fae7bd-20220213121002-4c5f7.png"
        alt="">
```

语法有如下：

- linear：规定以相同的速度开始至结束的过渡效果，等于（cubic-bezier(0,0,1,1)）。
- ease：规定慢速开始，然后变快，然后慢速结束的过渡效果（cubic-bezier(0.25,0.1,0.25,1)）。
- ease-in：规定以慢速度开始的过渡效果（等于 cubic-bezier(0.42,0,1,1)）。
- ease-out：规定以慢速度结束的过渡效果（等同于cubic-bezier(0,0,0.58,1)）。
- ease-in-out：规定以慢速度开始和结束的过渡效果（等同于cubic-bezier(0.42,0,0.58,1)）。
- cubic-bezier(n,n,n,n)：在 cubic-bezier 函数中定义自己的值。可能的值是 0 至 1 之间的数值。