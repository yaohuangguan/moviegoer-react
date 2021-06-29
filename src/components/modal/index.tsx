import Cancel from "./cancel-modal";
import Create from "./create-modal";
import PopConfirm from "./popover";
export interface ICommonModalProps {
  visible: boolean;
  title: any;
  content: string | JSX.Element;
}

export { useModal } from "./use-modal";
export type { IUseModal } from "./use-modal";
export default {
  Cancel,
  Create,
  PopConfirm,
};
