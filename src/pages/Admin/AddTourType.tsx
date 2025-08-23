import { DeleteConfirmation } from "@/components/DeleteConfirmation";
import { AddTourTypeModal } from "@/components/modules/Admin/TourType/AddTourTypeModal";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { useGetTourTypesQuery, useRemoveTourTypeMutation } from "@/redux/features/Tour/tour.api";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

export default function AddTourType() {

    const [currentPage, setCurrentPage] = useState(1)

    const { data } = useGetTourTypesQuery(undefined);

    const [removeTourType] = useRemoveTourTypeMutation();

    const handleRemoveTourType = async (tourId: string) => {

        const tostId = toast.loading("Removing..........")

        try {
            const res = await removeTourType(tourId).unwrap();
            if (res.success) {
                toast.success("Remove Tour Type SuccessFully", { id: tostId })
            }

        } catch (error) {
            console.log(error)
        }

    }

    return (
        <div className="w-full max-w-7xl mx-auto px-5">
            <div className="flex justify-between my-8">
                <h1 className="text-xl font-semibold">Tour Types</h1>
                <AddTourTypeModal />
            </div>
            <div className="border border-muted rounded-md">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Name</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data?.map((item: { _id: string; name: string }) => (
                            <TableRow key={item._id}>
                                <TableCell className="font-medium w-full">{item.name}</TableCell>
                                <TableCell className="font-medium w-full">
                                    <DeleteConfirmation onConfirm={() => { handleRemoveTourType(item._id) }}>
                                        <Button className="bg-amber-700">
                                            <Trash2 />
                                        </Button>
                                    </DeleteConfirmation>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <div className="flex justify-end">
                <div>
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious  onClick={() => setCurrentPage((prev) => prev - 1)}/>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#">1</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationNext  onClick={() => setCurrentPage((prev) => prev + 1)}/>
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            </div>
        </div>
    );
}