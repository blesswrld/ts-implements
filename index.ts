enum TransferStatus {
    Pending = "pending",
    Rejected = "rejected",
    Completed = "completed",
}

enum ErrorMessages {
    NotFound = "Not found: 404",
    NotEnoughSpace = "Not enough space: 507",
    Forbidden = "Forbidden: 403",
}

interface ITransfer {
    path: string;
    data: string[];
    date?: Date;
    start: (p: string, d: string[]) => string;
    stop: (reason: string) => string;
}

interface TransferError {
    message: ErrorMessages;
}

// Класс должен имплементировать ITransfer и TransferError
class SingleFileTransfer implements ITransfer, TransferError {
    path: string;
    data: string[];
    date?: Date;
    start: (p: string, d: string[]) => string;
    stop: (reason: string) => string;
    message: ErrorMessages;

    currentStatus: TransferStatus;

    constructor(initialPath: string, InitialData: string[], InitialDate: Date) {
        this.path = initialPath;
        this.data = InitialData;
        this.date = InitialDate;
        this.currentStatus = TransferStatus.Pending;
        this.message =
            ErrorMessages.NotFound ||
            ErrorMessages.Forbidden ||
            ErrorMessages.NotEnoughSpace;
        this.start = (p: string, d: string[]): string => {
            console.log(
                `Attempting to start transfer to ${p} with ${d.length} items.`
            );
            if (
                this.currentStatus !== TransferStatus.Completed &&
                this.currentStatus !== TransferStatus.Rejected
            ) {
                this.currentStatus = TransferStatus.Pending;
                this.message = ErrorMessages.NotFound;
            } else {
                return "Cannot start transfer in current state.";
            }
            return "Transfer process started";
        };
        this.stop = (reason: string): string => {
            console.log(`Stopping transfer due to: ${reason}`);
            this.currentStatus = TransferStatus.Rejected;
            this.message = ErrorMessages.Forbidden;
            const stopDate = new Date().toISOString();
            return `Transfer stopped on ${stopDate} because: ${reason}`;
        };
    }

    // Место для реализаций
    // Необходимо создать метод checkTransferStatus, проверяющий состояние передачи данных
    // Можно вывести в консоль данные, можно вернуть строку
    checkTransferStatus() {
        if (this.currentStatus === TransferStatus.Pending) {
            console.log("Data is pending");
        } else if (this.currentStatus === TransferStatus.Rejected) {
            console.log(`Data is rejected. Reason: ${this.message}`);
        } else if (this.currentStatus === TransferStatus.Completed) {
            console.log("Data is completed to loading");
        } else {
            console.log("Unknown status");
        }
    }
    // Необходимо создать метод, который будет останавливать передачу данных
    // И возвращать строку с причиной и датой остановки (Дата в любом формате)
    stopTransferAction(reason: string) {
        const stopReport = this.stop(reason);
        console.log("Stop action handled, report:", stopReport);

        return stopReport;
    }
    // Необходимо создать метод, который будет возвращать строку, содержащую
    // Статус передачи и любое сообщение об ошибке. На ваш выбор или отталкиваться от приходящего аргумента

    // Метод может показаться странным, но может использоваться для тестов, например
    getTransferReport(includeError: boolean = true): string {
        let report = `Status: ${this.currentStatus}`;

        if (includeError && this.message) {
            report += `Error: ${this.message}; `;
        } else if (
            includeError &&
            !this.message &&
            this.currentStatus === TransferStatus.Rejected
        ) {
            report += `Error: Unknown error (Status is Rejected)`;
        }

        return report;
    }
}
const myTransfer = new SingleFileTransfer(
    "/path/to/file",
    ["data line 1", "data line 2"],
    new Date()
);

// Пример вызова метода
myTransfer.checkTransferStatus();
