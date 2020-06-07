#  ts知识

## ts基础库脚手架

[typescript-library-starter](https://github.com/alexjoverm/typescript-library-starter)脚手架官网

### 使用：

```shell
git clone https://github.com/alexjoverm/typescript-library-starter.git xxx名称
cd xxx名称

npm install
```

### 目录文件介绍 

`TypeScript library starter` 生成的目录结构如下

```markdown
├── CONTRIBUTING.md
├── LICENSE 
├── README.md
├── code-of-conduct.md
├── node_modules
├── package-lock.json
├── package.json
├── rollup.config.ts // rollup 配置文件
├── src // 源码目录
├── test // 测试目录
├── tools // 发布到 GitHup pages 以及 发布到 npm 的一些配置脚本工具
├── tsconfig.json // TypeScript 编译配置文件
└── tslint.json // TypeScript lint 文件
```

### 优秀工具集成

使用 `TypeScript library starter` 创建的项目集成了很多优秀的开源工具：

- 使用 [RollupJS](https://rollupjs.org/) 帮助我们打包。

- 使用 [Prettier](https://github.com/prettier/prettier) 和 [TSLint](https://palantir.github.io/tslint/) 帮助我们格式化代码以及保证代码风格一致性。

- 使用 [TypeDoc](https://typedoc.org/) 帮助我们自动生成文档并部署到 GitHub pages。

- 使用 [Jest](https://jestjs.io/)帮助我们做单元测试。

- 使用 [Commitizen](https://github.com/commitizen/cz-cli)帮助我们生成规范化的提交注释。

- 使用 [Semantic release](https://github.com/semantic-release/semantic-release)帮助我们管理版本和发布。

- 使用 [husky](https://github.com/typicode/husky)帮助我们更简单地使用 git hooks。

- 使用 [Conventional changelog](https://github.com/conventional-changelog/conventional-changelog)帮助我们通过代码提交信息自动生成 change log。

### Npm Scripts

`TypeScript library starter` 同样在 `package.json` 中帮我们配置了一些 `npm scripts`，接下来我们先列举一下我们开发中常用的 `npm scripts`，剩余的我们在之后学习中遇到的时候再来介绍。

 - `npm run lint`: 使用 TSLint 工具检查 `src` 和 `test` 目录下 TypeScript 代码的可读性、可维护性和功能性错误。
 - `npm start`: 观察者模式运行 `rollup` 工具打包代码。
 - `npm test`: 运行 `jest` 工具跑单元测试。
 - `npm run commit`: 运行 `commitizen` 工具提交格式化的 `git commit` 注释。
 - `npm run build`: 运行 `rollup` 编译打包 TypeScript 代码，并运行 `typedoc` 工具生成文档。

## 元组类型

1. 元组类型是数组里面的类型一一对应声明的类型

```typescript
let x:[string,number];
x = ['你好',10];

x[0] = "你好" //✔ 
x[0] = 1 //✖ 元组第一个是string类型，所以设置报错

x[0].substring(0,1) // ✔
x[1].substring(0,1) //✖ number类型没有substring方法

x[4] = "sss" //✖ 访问越界元素会报错
```



## 枚举类型

枚举类型的值如果没有设置，将会是number类型自增。如果设置的值是number类型，则会以已设置的值自增，如果是string类型的值，则直接赋值

```typescript
enum Color{
    Red=2,
    Green,
    Blue,
    Yellow ="黄色"
}

//编译的结果是
var Color;
(function (Color) {
    Color[Color["Red"] = 2] = "Red";
    Color[Color["Green"] = 3] = "Green";
    Color[Color["Blue"] = 4] = "Blue";
    Color["Yellow"] = "黄色";
})(Color || (Color = {}));

```



## never类型

never类型表示的是那些永不存在的值的类型

```typescript
// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
    throw new Error(message);
}

// 推断的返回值类型为never
function fail() {
    return error("Something failed");
}

// 返回never的函数必须存在无法达到的终点
function infiniteLoop(): never {
    while (true) {
    }
}
```

## let类型

1. let声明的变量的作用域是块级的
2. let不能重复声明已存在的变量
3. let有暂时性死区，不会被提升

```typescript
//如果是var的话会有变量提升，这时候foo中的a是可以访问的
function foo(){
    return a;
}
foo();
var a;

// 这里报错 ✖,let 不会变量提升，所以foo()执行的时候是没有a这个变量
function foo(){
    return a;
}
foo();
let a;

//解决这个问题是先声明a在执行foo(); ✔
let a
foo();

//在块级中绑定了作用域，但是tmp并未声明就被赋值了
var tmp = 123;
if (true) {
   tmp = 'abc'; // Cannot access 'tmp' before initialization
   let tmp;
}
```

## 解构

```typescript
//foo有一个参数，参数是个对象类型。
function foo({a,b=0} = {a:''}):void{

}

foo({a:'yes'}) // ✔ 参数是个对象，对象中包含a，没有包含b。但是foo会有默认给b赋值为0

foo() // ✔ 如果没有传入参数，foo会选择默认值{a:''}，同时会合并b=0;所以最终的参数为{a:'',b=0}

foo({}) //✖ 如果参数不为空的话，对象a的属性是必须要有的
```

## 接口

### 属性检查

```typescript
interface IProps{
  color:string;
  count:number;
}

function foo(data:IProps){
  return data.color + data.count;
}
const obj = {size:1,color:'red',count:11};
console.log(foo(obj)); //✔ 这样掉用不会出现错误

console.log(foo({size:1,color:'red',count:11})) // ✖ 如果传入的是对象字面量typescript编译器报错不会通过编译，typescript会对对象字面量做额外的属性检查

```

上面的解决方案可以把对象字面量as一下，也可以使用额外的声明变量或者使用索引签名

```typescript
// 1. 对象字面量as一下
foo({size:1,color:'red',count:11} as IProps) //✔
// 2. 声明变量
const obj = {size:1,color:'red',count:11};
console.log(foo(obj)); //✔ 这样掉用不会出现错误

// 3. 索引签名
interface IProps{
  color:string;
  count:number;
  [propName:string]:any; //这样可以声明任意的属性，只要不为color和count
}
console.log(foo({size:1,color:'red',count:11}))
```

### 函数接口

接口也可以描述函数类型，为了使用接口表示函数类型，我们需要给接口定义一个调用签名。它就像是一个只有参数列表和返回值类型的函数定义，参数列表里的每个参数都需要名字和类型。

```typescript
interface SearchFunc {
  (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
  let result = source.search(subString);
  return result > -1;
}
// 这样写也是可以的，ts会自动的进行类型推断
let mySearch: SearchFunc;
mySearch = function(src, sub) {
    let result = src.search(sub);
    return result > -1;
}
```

### 类类型

TypeScript能够用它来明确的强制一个类去符合某种契约。

```typescript
interface ClockInterface {
    currentTime: Date;
    setTime(d: Date);
}
//类定义了接口就需要实现这些接口中的属性和方法
class Clock implements ClockInterface {
    currentTime: Date;
    setTime(d: Date) {
        this.currentTime = d;
    }
    constructor(h: number, m: number) { }
}
```

### 混合类型

一个对象可以同时具有多种类型。

```typescript
//一个对象可以同时做为函数和对象使用，并带有额外的属性。
interface Counter{
    (start):number:string;
	interval:number;
	reset():void
}
    
function getCounter(): Counter {
    let counter = <Counter>function (start: number) { };
    counter.interval = 123;
    counter.reset = function () { };
    return counter;
}

let c = getCounter();
c(10);
c.reset();
c.interval = 5.0;
```

## 类

### 继承

子类调用父类方法,使用`super`来调用

```typescript
class Animal {
    name: string;
    constructor(theName: string) { 
        this.name = theName; 
    }
    move(distanceInMeters: number = 0) {
        console.log(`${this.name} moved ${distanceInMeters}m.`);
    }
}

class Snake extends Animal {
    constructor(name: string) { super(name); }
    move(distanceInMeters = 5) {
        console.log("Slithering...");
        super.move(distanceInMeters);
    }
}

class Horse extends Animal {
    constructor(name: string) { super(name); }
    move(distanceInMeters = 45) {
        console.log("Galloping...");
        super.move(distanceInMeters);
    }
}

let sam = new Snake("Sammy the Python");
let tom: Animal = new Horse("Tommy the Palomino");

sam.move();
tom.move(34);
```

### 存取器

ts支持通过getters/setters来截取对对象成员的访问。它能有效的控制对对象成员访问。

```typescript
//可以随意的设置 fullName，这是非常方便的，但是这也可能会带来麻烦。
class Employee {
    fullName: string;
}

let employee = new Employee();
employee.fullName = "Bob Smith";
if (employee.fullName) {
    console.log(employee.fullName);
}
```

我们可以改成修改用户名称的时候检查密码是否正确。我们对`fullName`的直接访问改成可以检查密码的`set`方法。

```typescript
let passcode = "secret passcode";

class Employee {
    private _fullName: string;

    get fullName(): string {
        return this._fullName;
    }

    set fullName(newName: string) {
        if (passcode && passcode == "secret passcode") {
            this._fullName = newName;
        }
        else {
            console.log("Error: Unauthorized update of employee!");
        }
    }
}

let employee = new Employee();
employee.fullName = "Bob Smith";//当给类成员赋值的时候会进入set中，‘Bob Smith’作为fullName方法的参数，进行验证，如果密码正确赋值成功，如果密码错误会打印错误
if (employee.fullName) {//访问类成员的时候会进入get函数中
    alert(employee.fullName);
}
```

`get`和`set`原理就是使用了`Object.defineProperty`

### 抽象类

抽象类做为其它派生类的基类使用。 它们一般不会直接被实例化。 不同于接口，抽象类可以包含成员的实现细节。 `abstract`关键字是用于定义抽象类和在抽象类内部定义抽象方法。

```typescript
abstract class Animal {
    abstract makeSound(): void;
    move(): void {
        console.log('roaming the earch...');
    }
}
```

抽象类中的抽象方法不包含具体实现并且必须在派生类中实现。 抽象方法的语法与接口方法相似。 两者都是定义方法签名但不包含方法体。 然而，抽象方法必须包含 `abstract`关键字并且可以包含访问修饰符。

```typescript
abstract class Department {

    constructor(public name: string) {
    }

    printName(): void {
        console.log('Department name: ' + this.name);
    }

    abstract printMeeting(): void; // 抽象类自己不实现，必须在派生类中实现
}

class AccountingDepartment extends Department {

    constructor() {
        super('Accounting and Auditing'); // 在派生类的构造函数中必须调用 super()
    }
	// 实现抽象类中的方法
    printMeeting(): void {
        console.log('The Accounting Department meets each Monday at 10am.');
    }

    generateReports(): void {
        console.log('Generating accounting reports...');
    }
}

let department: Department; // 允许创建一个对抽象类型的引用
department = new Department(); // 错误: 不能创建一个抽象类的实例
department = new AccountingDepartment(); // 允许对一个抽象子类进行实例化和赋值
department.printName();
department.printMeeting();
department.generateReports(); // 错误: 方法在声明的抽象类中不存在
```

## 函数

### `this`和箭头函数

下面看一个例子：

```typescript
let deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    createCardPicker: function() {
        return () => {
            let pickedCard = Math.floor(Math.random() * 52);
            let pickedSuit = Math.floor(pickedCard / 13);
            //TypeScript会警告你犯了一个错误，如果你给编译器设置了--noImplicitThis标记。 它会指出 this.suits[pickedSuit]里的this的类型为any。
            return {
                suit: this.suits[pickedSuit], 
                card: pickedCard % 13
            };
        }
    }
}

let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker();

alert("card: " + pickedCard.card + " of " + pickedCard.suit);
```

让我们往例子里添加一些接口，`Card` 和 `Deck`

```typescript
interface Card {
    suit: string;
    card: number;
}
interface Deck {
    suits: string[];
    cards: number[];
    createCardPicker(this: Deck): () => Card;
}
let deck: Deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    // 现在TypeScript知道createCardPicker期望在某个Deck对象上调用。 也就是说 this是Deck类型的，而非any
    createCardPicker: function(this: Deck) {
        return () => {
            let pickedCard = Math.floor(Math.random() * 52);
            let pickedSuit = Math.floor(pickedCard / 13);

            return {suit: this.suits[pickedSuit], card: pickedCard % 13};
        }
    }
}

let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker();

alert("card: " + pickedCard.card + " of " + pickedCard.suit);
```

## 函数重载

JavaScript本身是个动态语言。 JavaScript里函数根据传入不同的参数而返回不同类型的数据是很常见的。如果我们想让传入的参数每次做检查，这样就需要用到函数重载

```typescript
let suits = ["hearts", "spades", "clubs", "diamonds"];
// 重载定义
function pickCard(x: {suit: string; card: number; }[]): number;
// 重载定义
function pickCard(x: number): {suit: string; card: number; };

// 重载实现
function pickCard(x): any {
    // 检查我们传入的是否是对象或者数组
    if (typeof x == "object") {
        let pickedCard = Math.floor(Math.random() * x.length);
        return pickedCard;
    }
    else if (typeof x == "number") {
        let pickedSuit = Math.floor(x / 13);
        return { suit: suits[pickedSuit], card: x % 13 };
    }
}

let myDeck = [{ suit: "diamonds", card: 2 }, { suit: "spades", card: 10 }, { suit: "hearts", card: 4 }];
let pickedCard1 = myDeck[pickCard(myDeck)];
alert("card: " + pickedCard1.card + " of " + pickedCard1.suit);

let pickedCard2 = pickCard(15);
alert("card: " + pickedCard2.card + " of " + pickedCard2.suit);
```



