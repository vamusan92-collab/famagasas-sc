export type MathResult = {
  handled: boolean;
  response?: string;
};

export function handleMath(message: string): MathResult {
  const text = message.toLowerCase().trim();

  // Percentage of a number
  const percentMatch = text.match(
    /(?:what is|calculate|find)?\s*(\d+(?:\.\d+)?)\s*%\s*of\s*(\d+(?:\.\d+)?)/
  );

  if (percentMatch) {
    const percentage = Number(percentMatch[1]);
    const number = Number(percentMatch[2]);
    const result = (percentage / 100) * number;

    return {
      handled: true,
      response: `${percentage}% of ${number} is ${result}.`,
    };
  }

  // Basic arithmetic
  const arithmeticMatch = text.match(
    /(?:what is|calculate|find)?\s*(-?\d+(?:\.\d+)?)\s*([+\-*/])\s*(-?\d+(?:\.\d+)?)/
  );

  if (arithmeticMatch) {
    const first = Number(arithmeticMatch[1]);
    const operator = arithmeticMatch[2];
    const second = Number(arithmeticMatch[3]);

    let result: number;

    switch (operator) {
      case "+":
        result = first + second;
        break;

      case "-":
        result = first - second;
        break;

      case "*":
        result = first * second;
        break;

      case "/":
        if (second === 0) {
          return {
            handled: true,
            response: "Division by zero is not defined.",
          };
        }

        result = first / second;
        break;

      default:
        return { handled: false };
    }

    return {
      handled: true,
      response: `${first} ${operator} ${second} = ${result}`,
    };
  }

  return {
    handled: false,
  };
}
