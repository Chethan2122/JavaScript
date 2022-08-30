function arthop(num1:number,num2:number,operator:string)
{
    switch(operator)
    {
        case '+':
            console.log('Sum : '+(num1+num2));
            break;
        case '-':
            console.log('Sub : '+(num1-num2));
            break;
        case '*':
            console.log('Mul : '+(num1*num2));
            break;
        case '/':
            console.log('Div : '+(num1/num2));
            break;
    }
}
arthop(4,2,'-');