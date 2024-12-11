

export class Logger {

    public static Log(message: string) {
        console.log(message);

    }

    public static Error(message: string) {
        console.error(message);
    }

    public static Critical(message: string) {
        console.error(message);
        alert(message);
    }


}
