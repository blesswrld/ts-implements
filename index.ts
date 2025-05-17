// Интерфейс юзера
interface IUser {
    login: string;
    password: string;
    // Необязательно свойство token тернарный оператор(?)
    token?: number;
}

interface IValidation {
    valid: boolean;
    // Метод
    isValid: (data: string) => boolean;
}

// Устаналиваем связь между классом UserForm и интерфейсом IUser и методом isValid
class UserForm implements IUser, IValidation {
    login: string;
    password: string;
    valid: boolean = false;
    token: number;

    isValid(login: string) {
        return login.length > 3;
    }
}

new UserForm().token;
