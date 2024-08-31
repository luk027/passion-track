import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { getJobs } from "@/api/apiJobs";
import { BarLoader } from "react-spinners";
import UseFetch from "@/hooks/UseFetch";
import JobCard from "@/components/JobCard";
import { getCompanies } from "@/api/apiCompanies";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { State } from "country-state-city";

const JobListing = () => {
  //Pagination
  const [page, setPage] = useState(1);

  const [searchQueary, setSearchQueary] = useState("");
  const [location, setLocation] = useState("");
  const [company_id, setCompany_id] = useState("");

  const { isLoaded } = useUser();

  const {
    fn: fnJobs,
    data: jobs,
    loading: loadingJobs,
  } = UseFetch(getJobs, {
    searchQueary,
    location,
    company_id,
  });

  const { fn: fnCompanies, data: companies } = UseFetch(getCompanies);

  useEffect(() => {
    if (isLoaded) fnCompanies();
  }, [isLoaded]);

  useEffect(() => {
    if (isLoaded) fnJobs();
  }, [isLoaded, searchQueary, location, company_id]);

  const handleSearch = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);

    const query = formData.get("search-query");
    if (query) setSearchQueary(query);
  };

  const clearFilters = () => {
    setSearchQueary("");
    setLocation("");
    setCompany_id("");
  };

  const selectPageHandler = (selectedPage) => {
    if(selectedPage >= 1 && selectedPage <= jobs.length/6+1  && selectedPage !== page){
      setPage(selectedPage);
    }
  }

  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }
  console.log(jobs)

  return (
    <div>
      <h1 className="gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8">
        Latest Jobs
      </h1>

      {/* Add Filters Here  */}
      <form
        className="h-14 w-full flex items-center gap-2 mb-3"
        onSubmit={handleSearch}
      >
        <Input
          type="text"
          placeholder="Search Jobs by Title..."
          name="search-query"
          className="h-full flex-1 px-4 text-base sm:text-xl"
        />

        <Button type="submit" variant="blue" className="h-full sm:w-28">
          Search
        </Button>
      </form>

      <div className="flex flex-col sm:flex-row gap-2">
        <Select value={location} onValueChange={(value) => setLocation(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by location" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {State.getStatesOfCountry("IN").map(({ name }) => {
                return (
                  <SelectItem key={name} value={name}>
                    {" "}
                    {name}{" "}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select
          value={company_id}
          onValueChange={(value) => setCompany_id(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Filter by Company" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {companies?.map(({ name, id }) => {
                return (
                  <SelectItem key={name} value={id}>
                    {name}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Button
          onClick={clearFilters}
          variant="destructive"
          className="sm:w-1/2"
        >
          Clear Filters
        </Button>
      </div> 

      {loadingJobs && (
        <BarLoader className="mt-4" width={"100%"} color="#36d7b7" />
      )}
      {loadingJobs === false && (
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {jobs?.length ? (
            jobs.sort((a, b) => {
              // Assuming you want to sort by some property, e.g., `createdAt` or `date`
              // Adjust the property according to your data structure
              return new Date(b.created_at) - new Date(a.created_at); // Descending order
            }).slice(page * 6 - 6, page * 6).map((job) => {
              return (
                <JobCard
                  key={job.id}
                  job={job}
                  savedInit={job?.saved?.length > 0}
                />
              );
            })
          ) : (
            <div>No Jobs Found 🥲</div>
          )}
        </div>
      )}
      {/* Pagination  */}
      {jobs?.length > 0 && (
        <div className="flex justify-center items-center mt-5 mb-5" aria-label="Page navigation example">
          <ul className="inline-flex -space-x-px text-sm font-semibold">
          <li 
          onClick={() => selectPageHandler(page - 1)}
          className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 hover:text-gray-300 border bg-[#020817] border-[#1e293b] cursor-pointer rounded-s-md">
            Previous
          </li>
          {[...Array(Math.floor(jobs?.length / 6), 0)].map(
            (_, i) => (
              <li
              className={ page===i+1 ? "flex items-center justify-center px-3 h-8 leading-tight text-gray-300  border bg-[#1e293b] cursor-pointer border-[#1e293b]" 
                : "flex items-center justify-center px-3 h-8 leading-tight text-gray-500 hover:text-gray-300 border bg-[#020817] cursor-pointer border-[#1e293b]" }  
              onClick={() => selectPageHandler(i + 1)} 
              key={i} 
              > 
              {i + 1}
              </li>
            )
          )}
            <li 
            onClick={() => selectPageHandler(page + 1)}
            className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 hover:text-gray-300 border bg-[#020817] border-[#1e293b] cursor-pointer rounded-e-md">
              Next
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default JobListing;
