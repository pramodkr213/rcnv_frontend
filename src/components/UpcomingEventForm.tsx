import { useQueryClient } from "@tanstack/react-query";
import ProcessingButton from "./ProcessingButton";

import { useRef, useState } from "react";
import { UpEvnApi } from "../api/upevent";
import { ToastMessage } from "../utils/toast";
import Textarea from "./Textarea";
const UpcomingEventForm = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [errordate, setErrordate] = useState("");
   const [errordesc, setErrordesc] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [processing, setProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState("");
  const queryClient = useQueryClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!title) {
      setError("Please enter a title for the upcoming event.");
      return;
    }
    if (!date) {
      setErrordate("Please enter a date for the upcoming event.");
      return;
    }
    if (description == '') {
      setErrordesc("Please enter a description for the upcoming event.");
      return;
    }

    setProcessing(true);
    try {
      await UpEvnApi.addUpEvn(title, date , description);
      ToastMessage.success("Added Upcoming Event successfully.");
      queryClient.invalidateQueries({ queryKey: ["upc-evt"] });
      setTitle("");
      setDate("");
      setDescription("");
      setError("");
      setErrordate("");
      setErrordesc("");

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err: unknown) {
      ToastMessage.error("Failed to add Upcoming Event.");
    } finally {
      setProcessing(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Textarea
          label="Title"
          placeholder="Enter Upcoming event title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      {error && <div className="mt-2 text-xs text-red-500">{error}</div>}
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Date
        </label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="block w-full text-sm text-gray-700 border border-gray-200 rounded-xl cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-400 file:mr-4 file:py-2 file:px-4  file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 transition"
        />
      </div>

      {errordate && <div className="mt-2 text-xs text-red-500">{errordate}</div>}

       <div>
         <Textarea
          label="Description"
          placeholder="Enter Upcoming event Descripton"
          name="title"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
       {errordesc && <div className="mt-2 text-xs text-red-500">{errordesc}</div>}
      <ProcessingButton type="submit" processing={processing}>
        Add Upcoming Event
      </ProcessingButton>
    </form>
  );
};

export default UpcomingEventForm;
