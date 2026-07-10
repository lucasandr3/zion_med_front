/** Tipagens do Go Assistant — base de conhecimento e runtime. */

export type AssistantPermissionKey =
  | 'dashboard.access'
  | 'templates.manage'
  | 'submissions.view'
  | 'submissions.approve'
  | 'people.deactivate'
  | 'organization.manage'
  | 'users.manage'
  | 'billing.manage'
  | 'notifications.access'
  | 'platform_admin';

export type AssistantEventKind =
  | 'screen'
  | 'intent'
  | 'search'
  | 'action'
  | 'tour'
  | 'no_match';

export type AssistantActionType =
  | 'navigate'
  | 'navigate-create'
  | 'start-tour'
  | 'external';

export interface AssistantTutorialStep {
  order: number;
  text: string;
  route?: string;
  highlightSelector?: string;
}

export interface AssistantAction {
  id: string;
  label: string;
  type: AssistantActionType;
  route?: string;
  permission?: AssistantPermissionKey;
  tourId?: string;
}

export interface AssistantScreen {
  id: string;
  moduleId: string;
  title: string;
  /** Padrões de rota (suporta `:param`). Ordem: mais específico primeiro no registry. */
  routePatterns: string[];
  permissionsAny?: AssistantPermissionKey[];
  /** Intents exibidos como ajuda contextual nesta tela. */
  quickAskIntentIds: string[];
  tourId?: string;
  relatedScreenIds?: string[];
}

export interface AssistantIntent {
  id: string;
  title: string;
  aliases: string[];
  keywords: string[];
  screenIds: string[];
  permissionsAny?: AssistantPermissionKey[];
  tutorial: AssistantTutorialStep[];
  actions: AssistantAction[];
  relatedIntentIds?: string[];
}

export interface AssistantTourStep {
  id: string;
  selector: string;
  title: string;
  body: string;
  placement?: 'top' | 'bottom' | 'left' | 'right';
}

export interface AssistantTour {
  id: string;
  screenId: string;
  steps: AssistantTourStep[];
}

export interface AssistantContext {
  route: string;
  screen: AssistantScreen | null;
  moduleId: string | null;
}

export interface AssistantSearchHit {
  intent: AssistantIntent;
  score: number;
}

export type AssistantDrawerView =
  | { kind: 'home' }
  | { kind: 'search'; query: string; hits: AssistantSearchHit[] }
  | { kind: 'intent'; intent: AssistantIntent }
  | { kind: 'empty'; query: string; suggestions: AssistantIntent[] };

export interface GoAssistantHistoryItem {
  id: number;
  kind: AssistantEventKind;
  screen_id: string | null;
  intent_id: string | null;
  route: string | null;
  title: string | null;
  query: string | null;
  meta: Record<string, unknown> | null;
  created_at: string | null;
}

export interface GoAssistantPopularItem {
  intent_id: string;
  title: string | null;
  count: number;
}

export interface GoAssistantEventPayload {
  kind: AssistantEventKind;
  screen_id?: string | null;
  intent_id?: string | null;
  route?: string | null;
  title?: string | null;
  query?: string | null;
  meta?: Record<string, unknown> | null;
}
