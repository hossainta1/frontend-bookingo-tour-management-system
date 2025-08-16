import { AddDivisionModal } from "@/components/modules/Admin/Division/AddDivisionModal";


export default function AddDivision() {
    return (
        <div className="flex justify-between my-8">
            <h1 className="text-xl font-semibold">Add Division</h1>
            <AddDivisionModal></AddDivisionModal>
        </div>
    );
}