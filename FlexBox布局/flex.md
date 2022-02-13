# flexbox布局学习

## 什么是flex布局

`Flex`是`Flex Box`的缩写，也就是`弹性布局`的意思，用来为盒模型提供最大的灵活性。

任何一个容器都可以指定为`Flex`布局。

```html
.box {
        display: flex;
        width: 100px;
        height: 100px;
        background: #000;
}
<div class="box"></div>
```

行内元素也可以使用`Flex`布局。

```html
.box1 {
    display: inline-flex;
    width: 100px;
    height: 100px;
    background: rgb(202, 151, 151);
}
<span class="box1">123</span>
```

当设置成`Flex`布局以后，子元素的`float`，`clear`，`vertical-align`属性都会失效。

## 基本概念

采用`Flex`布局的元素成为`Flex`容器，简称`容器`，它所在的子元素自动成员容器成员，称为`Flex`项目（`flex item`），简称`项目`。

![](https://raw.githubusercontent.com/dpy0912/PicGo/main/fix-dir/Roaming/picgo/2022/02/13/12-10-02-93988dbb28a44ac7c3780fc769fae7bd-20220213121002-4c5f7.png)

容器默认存在两根轴：水平主轴（`main axis`）和垂直交叉轴（`cross axis`）。主轴的开始位置（与边框的交叉点）叫做`main start`，结束位置叫做`main end`，交叉轴的开始位置叫做`cross start`，结束位置叫做`cross end`。

项目默认主轴排列，单个项目占据主轴的叫做`main size`，占据交叉轴的叫做`cross size`。

## 容器的属性

容器有以下6个属性：

- flex-direction
- flex-wrap
- flex-flow
- justify-content
- align-item
- align-content
  
### flex-direction属性

`flex-direction`决定主轴的方向。

```css
.box {
    display: flex;
    width: 100px;
    height: 100px;
    background: #000;
    flex-direction: row | row-reverse | column | column-reverse;
}
```

`flex-direction`它存在四个值。

    - row（默认）：主轴为水平方向，起点在左端。
    - row-reverse：主轴为水平方向，起点在右端。
    - column：主轴为垂直方向，起点在上沿。
    - column-reverse：主轴为垂直方向，起点在下沿。

### flex-wrap属性

默认情况下，项目都排列在一条线上，`flex-wrap`属性定义，如果一条轴线排不下，如何换行。

```css
.box {
    display: flex;
    flex-wrap: nowrap | wrap | wrap-reverse;
}
```

`flex-wrap`有三个值。

    - nowrap（默认）：默认不换行。
    - wrap：换行，第一行在上方。
    - wrap-reverse：换行，第一行在下方。

### flex-flow属性

`flex-flow`属性是`flex-direction`和`flex-wrap`的简写形式，默认为`row nowrap`。

```css
.box {
    display: flex;
    flex-flow: row wrap;
}
```

### justify-content属性

`justify-content`属性定义了项目在主轴上的对齐方式。

```css
.box {
    display: flex;
    justify-content: flex-start | flex-end | center | space-between | space-around;
}
```

`justify-content`属性有五个值。

    - flex-start（默认）：左对齐。
    - flex-end：右对齐。
    - center：居中对其。
    - space-between：两端对齐，项目之间的间隔都相等。
    - space-around：每个项目两侧的间隔相等，所以，项目之间的间隔比项目与边框的间距大一倍。

### align-items属性

`align-items`属性定义在项目的交叉轴上如何对齐。

`align-items`属性一共有五个值。

    - flex-start：交叉轴的起点对齐。
    - flex-end：交叉轴的终点对齐。
    - center：交叉轴的中间对齐。
    - baseline：项目的第一行文字的基线对齐。
    - stretch（默认）：如果项目未设置高度或者设为auto，将占满整个容器的高度。

### align-content属性

`align-content`属性定义了多根轴线的对其方式，如果项目只有一根轴线，该属性不起作用。

```css
.box {
    align-content: flex-start | flex-end | center | stretch | space-between | space-around;

}
```

`align-content`属性可能取6个值。

    - flex-start：与交叉轴的起点对齐。
    - flex-end：与交叉轴的终点对齐。
    - center：与交叉轴的中间对齐。
    - space-between：与交叉轴的两端对齐，轴线之间的间隔平均分布，
    - space-around：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。
    - stretch：轴线占满整个交叉轴。

## 项目属性

以下6个属性设置在项目上。

    - order
    - flex-grow
    - flex-shrink
    - flex-basis
    - flex
    - align-self

### order属性

`order`属性定义项目的排列顺序。数值越小，排列越靠前，默认为0。

```css
.box-item1 {
    width: 200px;
    height: 100px;
    background: rgb(105, 95, 95);
    margin-right: 10px;
    margin-bottom: 10px;
    order: 1;
}
```

### flex-grow属性

`flex-grow`属性定义项目的放大比例，默认为`0`，即如果存在剩余空间，也不放大。

```css
.box-item1 {
    width: 200px;
    height: 100px;
    background: rgb(105, 95, 95);
    margin-right: 10px;
    margin-bottom: 10px;
    order: 1;
    flex-grow: 1;
}
```

如果所有项目的`flex-grow`属性都为1，则它们将等分剩余空间（如果没有的话），如果一个项目的`flex-grow`属性为2，则其他项目都为1，则前者占据的剩余空间将比其他项目多一倍。

### flex-shrink属性

`flex-shrink`属性定义了项目的缩小比例，默认为1，即如果空间不足，则项目缩小。

```css
.box-item1 {
    width: 200px;
    height: 100px;
    background: rgb(105, 95, 95);
    margin-right: 10px;
    margin-bottom: 10px;
    order: 1;
    flex-shrink: 1;
}
```

如果所有项目的`flex-shrink`属性都为1，当空间不足时，都将等比例缩小。如果一个项目的`flex-shrink`属性为0，其他项目都为1，则空间不足时，前者不缩小。

负值对该属性无效。

### flex-basis属性

`flex-basis`属性定义了在分配多余空间之前，项目占据的主轴空间。浏览器会根据这个属性，计算主轴是否有多余空间，它的默认值为auto，即项目的本来大小。

```css
.box-item1 {
    width: 200px;
    height: 100px;
    background: rgb(105, 95, 95);
    margin-right: 10px;
    margin-bottom: 10px;
    flex-basis: auto | <length>;
}
```

它可以设为跟`width`或`height`属性一样的值（比如100px），则项目将占据固定空间。

### flex属性

`flex`属性是`flex-grow`，`flex-shrink`和`flex-basis`的简写，默认值为`0 1 auto`，后面两个属性可选。

```css
.box-item1 {
    width: 200px;
    height: 100px;
    background: rgb(105, 95, 95);
    margin-right: 10px;
    margin-bottom: 10px;
    flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
}
```

该属性有两个快捷值：`auto`（（0 1 auto）和`none`（0 0 auto）。

建议优先使用这个属性，而不是单独写三个分离的属性，因为浏览器会推算相关值。

### align-self属性

`align-self`属性允许单个项目与其他项目不一样的对其方式，可覆盖`align-items`属性，默认值为`auto`，表示继承父元素的`align-items`属性，如果没有父元素，那么等同于`stretch`。

```css
.item {
    width: 200px;
    height: 100px;
    background: rgb(105, 95, 95);
    margin-right: 10px;
    margin-bottom: 10px;
    align-self: auto | flex-start | flex-end | center | baseline | stretch;
}
```

该属性可能取6个值，除了auto，其他都与align-items属性完全一致。