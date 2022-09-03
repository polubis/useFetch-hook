import { useForm } from "libs/form";
import { FormEvent, useMemo } from "react";
import {
  Alert,
  Backdrop,
  Button,
  Checkbox,
  InputField,
  StepItem,
  Steps,
} from "ui";
import { AlmostDoneImage } from "./AlmostDoneImage";
import {
  ACCOUNT_SETUP_VALUES,
  ACCOUNT_SETUP_VALIDATORS,
  WORK_COMPANY_VALUES,
  WORK_COMPANY_VALIDATORS,
  ALMOST_DONE_VALUES,
  ALMOST_DONE_VALIDATORS,
} from "./config";

import css from "./Register.module.scss";
import { useAccountCreator } from "./useAccountCreator";
import { useStep, STEPS } from "./useStep";

export const Register = () => {
  const step = useStep();
  const creator = useAccountCreator();

  const accountSetupForm = useForm(
    ACCOUNT_SETUP_VALUES,
    ACCOUNT_SETUP_VALIDATORS
  );
  const workCompanyForm = useForm(WORK_COMPANY_VALUES, WORK_COMPANY_VALIDATORS);
  const almostDoneForm = useForm(ALMOST_DONE_VALUES, ALMOST_DONE_VALIDATORS);

  const forms = [accountSetupForm, workCompanyForm, almostDoneForm];
  const form = forms[step.idx];

  const handleBack = (): void => {
    step.decrement();
  };

  const handleAlertClose = (): void => {
    accountSetupForm.reset();
    workCompanyForm.reset();
    almostDoneForm.reset();
    step.reset();
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    form.submit(e);

    if (!step.isLast) {
      step.increment();
      return;
    }

    if (step.isLast) {
      creator.create({
        ...accountSetupForm.values,
        ...workCompanyForm.values,
        ...almostDoneForm.values,
      });
    }
  };

  const enhancedSteps = useMemo(() => {
    return STEPS.map<StepItem>(({ label }, idx) => ({
      label,
      progress: forms[idx].progress,
      status: forms[idx].valid,
    }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountSetupForm, workCompanyForm, almostDoneForm]);

  return (
    <div className={css.register}>
      <h3>{step.data.label}</h3>
      <span className={css.description}>{step.data.description}</span>

      <Steps items={enhancedSteps} />

      <form onSubmit={handleSubmit}>
        {step.isFirst && (
          <>
            <InputField
              name="username"
              label="Username*"
              placeholder="CoolUsername1994"
              error={accountSetupForm.errors.username}
              value={accountSetupForm.values.username}
              onChange={accountSetupForm.change}
            />

            <InputField
              name="email"
              label="Email*"
              placeholder="example@gmail.com"
              error={accountSetupForm.errors.email}
              value={accountSetupForm.values.email}
              onChange={accountSetupForm.change}
            />

            <InputField
              name="password"
              label="Password*"
              type="password"
              placeholder="Add your strong password here..."
              error={accountSetupForm.errors.password}
              value={accountSetupForm.values.password}
              onChange={accountSetupForm.change}
            />

            <InputField
              name="repeatedPassword"
              label="Repeated password*"
              type="password"
              placeholder="Add your strong password here..."
              error={accountSetupForm.errors.repeatedPassword}
              value={accountSetupForm.values.repeatedPassword}
              onChange={accountSetupForm.change}
            />
          </>
        )}

        {step.isSecond && (
          <>
            <InputField
              name="company"
              label="Company"
              placeholder="Company name..."
              error={workCompanyForm.errors.company}
              value={workCompanyForm.values.company}
              onChange={workCompanyForm.change}
            />

            <InputField
              name="position"
              label="Position"
              placeholder="Frontend developer or other..."
              error={workCompanyForm.errors.position}
              value={workCompanyForm.values.position}
              onChange={workCompanyForm.change}
            />
          </>
        )}

        {step.isLast && (
          <>
            <AlmostDoneImage className={css.almostDoneImg} />

            <span className={css.description}>
              After confirming the regulations and acceptance we will send you
              an activation link to your email address
            </span>

            <div className={css.divider} />

            <Checkbox
              className={css.checkbox}
              invalid={!!almostDoneForm.errors.regulations}
              variant="informing"
              label={`* I declare that I have read the content of these 
  regulations. I accept its content and undertake to 
  comply with it.`}
              value={almostDoneForm.values.regulations}
              onChange={(_, value) => almostDoneForm.set("regulations", value)}
            />

            <Checkbox
              variant="informing"
              label={`I agree to receive commercial information by electronic 
  means`}
              value={almostDoneForm.values.commercial}
              onChange={(_, value) => almostDoneForm.set("commercial", value)}
            />
          </>
        )}

        <footer>
          {step.isFirst || (
            <Button
              theme="primaryTransparent"
              type="button"
              disabled={form.invalid || creator.pending}
              onClick={handleBack}
            >
              BACK
            </Button>
          )}

          <Button type="submit" disabled={form.invalid || creator.pending}>
            {step.isLast ? "CREATE ACCOUNT" : "NEXT"}
          </Button>
        </footer>
      </form>

      {creator.pending && <Backdrop />}

      {creator.ok && (
        <Alert
          id={1}
          className={css.alert}
          type="success"
          message="Account created"
          onClose={handleAlertClose}
        />
      )}
    </div>
  );
};
