import { runLocalAI } from "./ai";
import { runGroqAI } from "./groq";
import { handleMath } from "./capabilities/math";
import { handleEducation } from "./capabilities/education";
import { handleData } from "./capabilities/data";

export type LocalResult = {
  handled: boolean;
  response?: string;
};

export async function handleLocalRequest(
  message: string
): Promise<LocalResult> {
  // 1. Try the existing local AI brain first.
  const localAI = await runLocalAI(message);

  if (localAI.handled) {
    return localAI;
  }

  // 2. Try deterministic local tools.
  const math = handleMath(message);

  if (math.handled) {
    return math;
  }

  const education = handleEducation(message);

  if (education.handled) {
    return education;
  }

  const data = handleData(message);

  if (data.handled) {
    return data;
  }

  // 3. Try hosted Llama through Groq.
  const groqAI = await runGroqAI(message);

  if (groqAI.handled) {
    return {
      handled: true,
      response: groqAI.response,
    };
  }

  // Nothing could handle the request.
  return {
    handled: false,
  };
}
