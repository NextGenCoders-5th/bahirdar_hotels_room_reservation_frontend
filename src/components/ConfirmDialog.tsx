import { BookingStatus } from "@/enums/bookingStatusEnum";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";


export type FeatureConfirmActionType = () => [unknown, { isLoading: boolean }]
interface Props {
    onConfirm: () => void;
    feature: string;
    featureId: string;
    btnText?: string;
    isOpen?: boolean;
    status: BookingStatus;
    setStatus: (status: BookingStatus | null) => void;
    setIsOpen?: (open: boolean) => void;
    confirming: boolean;
    btnColor?: string;
}
export default function ConfirmAction({ btnText, onConfirm, isOpen, status, setStatus, setIsOpen, btnColor = 'accent-500', confirming }: Props) {

    return (
        <Dialog open={isOpen}  onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <button
                    onClick={() => setStatus(status)}
                    className={`px-4 py-1  border bg-[#34343400] border-${btnColor} text-${btnColor} hover:bg-${btnColor} rounded-md hover:text-slate-100`}>
                    {btnText?.replace(/ed/g, '') || `Confirm`}
                </button>
            </DialogTrigger>
            <DialogContent className="max-w-sm bg-slate-200">
                <DialogHeader>
                    <DialogTitle>Confirm Booking status Change</DialogTitle>
                </DialogHeader>
                <p className="text-gray-600">
                    Are you sure you want to confirm this acction? This action cannot be undone.
                </p>
                <DialogFooter>
                    <button
                        disabled={confirming}
                        onClick={() => setIsOpen?.(false)}
                        className="px-4 py-2 disabled:cursor-not-allowed bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                    >
                        Cancel
                    </button>
                    <button
                        disabled={confirming}
                        onClick={() => {
                            onConfirm();
                            setIsOpen?.(false);
                        }}
                        className="px-4 py-2 disabled:cursor-not-allowed text-slate-100 bg-accent-500/95  rounded-md hover:bg-accent-600"
                    >
                        Confirm
                    </button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
