export type EducationResult = {
  handled: boolean;
  response?: string;
};

export function handleEducation(message: string): EducationResult {
  const text = message.toLowerCase().trim();

  if (
    text.includes("what is opportunity cost") ||
    text.includes("define opportunity cost")
  ) {
    return {
      handled: true,
      response:
        "Opportunity cost is the value of the next best alternative that is given up when a choice is made.",
    };
  }

  if (
    text.includes("what is photosynthesis") ||
    text.includes("define photosynthesis")
  ) {
    return {
      handled: true,
      response:
        "Photosynthesis is the process by which green plants use light energy to make food from carbon dioxide and water, releasing oxygen as a by-product.",
    };
  }

  if (
    text.includes("what is inflation") ||
    text.includes("define inflation")
  ) {
    return {
      handled: true,
      response:
        "Inflation is a sustained increase in the general price level of goods and services, which reduces the purchasing power of money.",
    };
  }

  if (
    text.includes("what is gravity") ||
    text.includes("define gravity")
  ) {
    return {
      handled: true,
      response:
        "Gravity is the force of attraction between objects with mass. Near Earth's surface, it causes objects to accelerate toward the ground.",
    };
  }

  return {
    handled: false,
  };
}
