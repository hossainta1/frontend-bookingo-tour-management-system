import SingleImageUploder from "@/components/SingleImageUploder"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useAddDivisionMutation } from "@/redux/features/division/division.api"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

export function AddDivisionModal() {

    const [open, setOpen] = useState(false)

    const [addDivision] = useAddDivisionMutation()

    const [image, setImage] = useState<File | null>(null)

    const form = useForm({
        defaultValues: {
            name: "",
            description: ""
        }
    })


    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append("data", JSON.stringify(data));
        formData.append("file", image as File)

        try {
            const res = await addDivision(formData).unwrap();
            toast.success("Add Division Successfully")
            setOpen(false)
        } catch (error) {
            console.log(error)
        }


    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Add Division</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Division</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form className="space-y-5" id="add-division" onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Division</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Type Division Name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Division Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Type Devision Description"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </form>
                    <SingleImageUploder onChange={setImage}></SingleImageUploder>
                </Form>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button disabled={!image} type="submit" form="add-division">Add Division</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
