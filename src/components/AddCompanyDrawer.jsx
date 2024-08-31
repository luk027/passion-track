import { addNewCompany } from "@/api/apiCompanies";
import UseFetch from "@/hooks/UseFetch";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "./ui/drawer";
import { Button } from "./ui/button";
import { BarLoader } from "react-spinners";
import { Input } from "./ui/input";

  
  const schema = z.object({
    name: z.string().min(1, { message: "Company name is required" }),
    logo: z
      .any()
      .refine(
        (file) =>
          file[0] &&
          (file[0].type === "image/png" || file[0].type === "image/jpeg"),
        {
          message: "Only Images are allowed",
        }
      ),
  });
  
  // eslint-disable-next-line react/prop-types
  const AddCompanyDrawer = ({ fetchCompanies }) => {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm({
      resolver: zodResolver(schema),
    });
  
    const {
      loading: loadingAddCompany,
      error: errorAddCompany,
      data: dataAddCompany,
      fn: fnAddCompany,
    } = UseFetch(addNewCompany);
  
    const onSubmit = async (data) => {
      fnAddCompany({
        ...data,
        logo: data.logo[0],
      });
    };
  
    useEffect(() => {
      if (dataAddCompany?.length > 0) {
        fetchCompanies();
      }
    }, [loadingAddCompany]);
  
    return (
      <Drawer>
        <DrawerTrigger>
          <Button type="button" size="sm" variant="secondary">
            Add Company
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Add a New Company</DrawerTitle>
          </DrawerHeader>
          <form className="flex gap-2 p-4 pb-0">
            {/* Company Name */}
            <Input placeholder="Company name" {...register("name")} />
  
            {/* Company Logo */}
            <Input
              type="file"
              accept="image/*"
              className=" file:text-gray-500"
              {...register("logo")}
            />
  
            {/* Add Button */}
            <Button
              type="button"
              onClick={handleSubmit(onSubmit)}
              variant="destructive"
              className="w-40"
            >
              Add
            </Button>
          </form>
          <DrawerFooter>
            {errors.name && <p className="text-red-500">{errors.name.message}</p>}
            {errors.logo && <p className="text-red-500">{errors.logo.message}</p>}
            {errorAddCompany?.message && (
              <p className="text-red-500">{errorAddCompany?.message}</p>
            )}
            {loadingAddCompany && <BarLoader width={"100%"} color="#36d7b7" />}
            <DrawerClose asChild>
              <Button type="button" variant="secondary">
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  };
  
  export default AddCompanyDrawer;