import {ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface} from 'class-validator';

@ValidatorConstraint()
export class ValidateEnumStr implements ValidatorConstraintInterface {
    validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> | boolean {
        if (value){
            const enumArr = value.split("|");
            for (const e of enumArr){
                // if (!(e in validationArguments.constraints[0])) return false;
                if (!Object.values(validationArguments.constraints[0]).includes(e)) return false;
            }
        }
        return true;
    }

    defaultMessage(validationArguments?: ValidationArguments): string {
        return "element is not valid";
    }

}