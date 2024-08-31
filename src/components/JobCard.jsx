/* eslint-disable react/prop-types */
import { Heart, MapPinIcon, Trash2Icon } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Link } from "react-router-dom";
import UseFetch from "@/hooks/UseFetch";
import { useUser } from "@clerk/clerk-react"
import { useEffect, useState } from "react";
import { deleteJob, saveJob } from "@/api/apiJobs";
import { BarLoader } from "react-spinners";

const JobCard = ({ 
    job,
    savedInit = false, 
    isMyJob = false, 
    onJobAction = () => {},
 }) => {

    const [saved, setSaved] = useState(savedInit);

    const { 
        fn:fnSavedJob, 
        data:savedJob, 
        loading:loadingSavedJob,
    } = UseFetch( saveJob, { alreadySaved:saved } ); //

    const {user} = useUser();

    const handleSavedJob = async() => {
        await fnSavedJob({
            user_id: user.id,
            job_id: job.id,
        });
        onJobAction();   
    }

    const { loading: loadingDeleteJob, fn:fnDeleteJob } = UseFetch(deleteJob, {
        job_id: job.id,
    });

    const handleDeleteJob = async () => {
        await fnDeleteJob();
        onJobAction();
      };

    useEffect(() => {
        if(savedJob !== undefined) setSaved(savedJob?.length>0);
    }, [savedJob]);

  return (
    <Card className="flex flex-col">
        {loadingDeleteJob && (
            <BarLoader className="mt-4" width={"100%"} color="#36d7b7" />
        )}

        <CardHeader>
            <CardTitle className="flex justify-between font-bold">
                {job.title}
                { isMyJob && (
                    <Trash2Icon 
                    fill="red" 
                    size={18} 
                    className="text-red-300 cursor-pointer"
                    onClick={handleDeleteJob} />
                )}
            </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col gap-4 flex-1">
            <div className="flex justify-between">
                {job.company && <img src={job.company.logo_url} className="h-6" />}
                <div className="flex gap-2 items-center">
                    <MapPinIcon size={15} /> {job.location}
                </div>
            </div>
            <hr />
            {job.description.substring(0,job.description.indexOf("."))}.
        </CardContent>

        <CardFooter className="flex gap-2">

            <Link to={`/job/${job.id}`} className="flex-1">
                <Button 
                className="w-full"
                variant="secondary">
                    More Details
                </Button>
            </Link>

            {!isMyJob && (
                <Button
                variant="outline"
                className="w-15"
                onClick={handleSavedJob}
                disabled={loadingSavedJob}
                >
                    {saved ? ( 
                        <Heart size={20} fill="red" stroke="red" /> 
                        ) : ( 
                        <Heart size={20} /> 
                    )}
                </Button>
            )}
        </CardFooter>
    </Card>
  );
};

export default JobCard