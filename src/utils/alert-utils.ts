import toast from "react-hot-toast";
export class AlertUtils {
  static error(message: string) {
    toast.error(message, {
      position: "top-right",
    });
  }

  static success(message: string) {
    toast.success(message, {
      position: "top-right",
    });
  }
}
