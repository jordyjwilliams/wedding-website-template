export type YesNoResponse = 'yes' | 'no';
export type OptionalYesNoResponse = YesNoResponse | undefined;

export interface SelectOption<TValue extends string = string> {
  value: TValue;
  label: string;
}

export type YesNoOption = SelectOption<YesNoResponse>;

export interface YesNoLabels {
  yes: string;
  no: string;
}

export interface RsvpWeekendAnswers<TAnswer> {
  fridayEveningBbq: TAnswer;
  sundayRecoveryBreakfast: TAnswer;
  stayingOnSite: TAnswer;
}

export type RsvpWeekendFieldKey = keyof RsvpWeekendAnswers<unknown>;

export interface RsvpFormData extends RsvpWeekendAnswers<OptionalYesNoResponse> {
  attendance: OptionalYesNoResponse;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  guestCount: string;
  dietaryRestrictions: string;
  message: string;
}

export interface RsvpSubmitData
  extends
    Omit<RsvpFormData, 'attendance' | 'guestCount' | RsvpWeekendFieldKey>,
    RsvpWeekendAnswers<boolean> {
  attendance: boolean;
  guestCount: number;
  additionalGuestNames: string[];
  timestamp: string;
}
