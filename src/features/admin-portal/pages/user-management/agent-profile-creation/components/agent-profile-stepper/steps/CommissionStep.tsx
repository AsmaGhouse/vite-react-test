import { getController } from "@/components/form/utils/getController";
import FieldWrapper from "@/components/form/wrapper/FieldWrapper";
import { FormContentWrapper } from "@/components/form/wrapper/FormContentWrapper";
import FormFieldRow from "@/components/form/wrapper/FormFieldRow";
import Spacer from "@/components/form/wrapper/Spacer";
import { agreementDetails } from "../config/agent-profile-form-config";
import CheckboxWrapper from "@/components/form/wrapper/CheckboxWrapper";

const CommissionStep = () => {
  return (
    <FormContentWrapper>
      <Spacer>
        <FormFieldRow rowCols={4} groupName="Bank Details">
          {Object.values(agreementDetails.bankDetails).map((field, index) => {
            return (
              <FieldWrapper key={index}>{getController(field)}</FieldWrapper>
            );
          })}
        </FormFieldRow>
        <FormFieldRow rowCols={4} groupName="Admin Details">
          {Object.values(agreementDetails.adminDetails)
            .slice(0, 3)
            .map((field, index) => {
              return (
                <FieldWrapper key={index}>{getController(field)}</FieldWrapper>
              );
            })}
        </FormFieldRow>
        <FormFieldRow rowCols={4}>
          {Object.values(agreementDetails.adminDetails)
            .slice(3, 6)
            .map((field, index) => {
              return (
                <CheckboxWrapper
                  className="flex-col items-start items-direction-row"
                  label={field.label}
                  key={index}
                  id={`${agreementDetails.adminDetails}-${field.name}`}
                >
                  {getController(field)}
                </CheckboxWrapper>
              );
            })}
        </FormFieldRow>
      </Spacer>
    </FormContentWrapper>
  );
};

export default CommissionStep;
