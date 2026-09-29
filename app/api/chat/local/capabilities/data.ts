export type DataResult = {
  handled: boolean;
  response?: string;
};

function formatNumber(value: number): string {
  return Number.isInteger(value)
    ? value.toString()
    : value.toFixed(2).replace(/\.?0+$/, "");
}

function calculateAverage(numbers: number[]): number {
  return numbers.reduce((sum, number) => sum + number, 0) / numbers.length;
}

export function handleData(message: string): DataResult {
  const text = message.toLowerCase().trim();

  // Average / mean
  const averageMatch = text.match(
    /(?:average|mean)(?:\s+of)?\s*[:=]?\s*((?:-?\d+(?:\.\d+)?\s*,?\s*)+)/
  );

  if (averageMatch) {
    const numbers = averageMatch[1]
      .split(/[,\s]+/)
      .filter(Boolean)
      .map(Number);

    if (numbers.length > 0 && numbers.every(Number.isFinite)) {
      const average = calculateAverage(numbers);

      return {
        handled: true,
        response: `The average is ${formatNumber(average)}.`,
      };
    }
  }

  // Sum / total
  const totalMatch = text.match(
    /(?:sum|total)(?:\s+of)?\s*[:=]?\s*((?:-?\d+(?:\.\d+)?\s*,?\s*)+)/
  );

  if (totalMatch) {
    const numbers = totalMatch[1]
      .split(/[,\s]+/)
      .filter(Boolean)
      .map(Number);

    if (numbers.length > 0 && numbers.every(Number.isFinite)) {
      const total = numbers.reduce((sum, number) => sum + number, 0);

      return {
        handled: true,
        response: `The total is ${formatNumber(total)}.`,
      };
    }
  }

  // Highest / maximum
  const highestMatch = text.match(
    /(?:highest|maximum|max)(?:\s+of)?\s*[:=]?\s*((?:-?\d+(?:\.\d+)?\s*,?\s*)+)/
  );

  if (highestMatch) {
    const numbers = highestMatch[1]
      .split(/[,\s]+/)
      .filter(Boolean)
      .map(Number);

    if (numbers.length > 0 && numbers.every(Number.isFinite)) {
      const highest = Math.max(...numbers);

      return {
        handled: true,
        response: `The highest value is ${formatNumber(highest)}.`,
      };
    }
  }

  // Lowest / minimum
  const lowestMatch = text.match(
    /(?:lowest|minimum|min)(?:\s+of)?\s*[:=]?\s*((?:-?\d+(?:\.\d+)?\s*,?\s*)+)/
  );

  if (lowestMatch) {
    const numbers = lowestMatch[1]
      .split(/[,\s]+/)
      .filter(Boolean)
      .map(Number);

    if (numbers.length > 0 && numbers.every(Number.isFinite)) {
      const lowest = Math.min(...numbers);

      return {
        handled: true,
        response: `The lowest value is ${formatNumber(lowest)}.`,
      };
    }
  }

  return {
    handled: false,
  };
}
