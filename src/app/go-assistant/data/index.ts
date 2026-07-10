import { ASSISTANT_INTENTS } from './intents';
import { ASSISTANT_SCREENS } from './screens';
import { ASSISTANT_TOURS } from './tours';
import type { AssistantIntent, AssistantScreen, AssistantTour } from '../models/assistant.types';

export const GO_ASSISTANT_KB_VERSION = '1.0.0';

const screenById = new Map(ASSISTANT_SCREENS.map((s) => [s.id, s]));
const intentById = new Map(ASSISTANT_INTENTS.map((i) => [i.id, i]));
const tourById = new Map(ASSISTANT_TOURS.map((t) => [t.id, t]));

export function getAllScreens(): AssistantScreen[] {
  return ASSISTANT_SCREENS;
}

export function getAllIntents(): AssistantIntent[] {
  return ASSISTANT_INTENTS;
}

export function getScreenById(id: string): AssistantScreen | undefined {
  return screenById.get(id);
}

export function getIntentById(id: string): AssistantIntent | undefined {
  return intentById.get(id);
}

export function getTourById(id: string): AssistantTour | undefined {
  return tourById.get(id);
}

export function getTourByScreenId(screenId: string): AssistantTour | undefined {
  return ASSISTANT_TOURS.find((t) => t.screenId === screenId);
}
