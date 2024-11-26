"use client";
import { Button } from "@/components/elements/button";
import { CalendarSidebar } from "@/components/layout/CalendarSidebar";
import {
  GroupPageAdd,
  GroupPageCalendar,
  GroupPageDetails,
} from "@/components/pages/group";
import { groups, schedules } from "@/components/pages/group/dummy_group";
import { endOfWeek, startOfWeek, getMonth } from "date-fns";
import Link from "next/link";
import { useState, use, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BiChevronLeft } from "react-icons/bi";

import { useQuery, useMutation } from "@tanstack/react-query";
import { GetGroupDetail } from "@/components/query/detailGroup";
import { GetScheduleMonth, AddGroupSchedule, DeleteGroupSchedule, RejectGroupSchedule } from "@/components/query/groupCalendar";
import { ReformatGroupSchedule, ReformatScheduleBaru } from "@/lib/apiUtils";
import { FetchProfile } from "@/components/query/profileUser";
import { onError } from "@/components/query/errorHandler";
import toast from "react-hot-toast";

const getGroup = (id) => {
  return groups.find((group) => group.id === id);
};

export default function GroupPage({ params }) {
  const { id } = use(params);
  const group = getGroup(id);
  const [page, setPage] = useState("calendar");
  
  const router = useRouter();
  const [selectedWeek, setSelectedWeek] = useState({
    from: startOfWeek(new Date()),
    to: endOfWeek(new Date()),
  });
  const [selectedMonth, SetSelectedMonth] = useState(getMonth(selectedWeek.from) || getMonth(new Date()))

  const [groupSchedule, setGroupSchedule] = useState([])

  useEffect(() =>{
    SetSelectedMonth(getMonth(selectedWeek.from))
  }, [selectedWeek])

  const FetchGroupDetailQuery = useQuery({
    queryKey: ["detail"],
    queryFn: (props) => {
      return GetGroupDetail({ _id: id });
    },
    refetchOnWindowFocus: false,
    retry: 2,
  });

  const GetAllScheduleWithinTheMonth = useQuery({
    queryKey: [selectedMonth, id],
    queryFn: (props) => {
      return GetScheduleMonth({
        ...props,
        callback : (data) => {
          ReformatGroupSchedule(data)
          setGroupSchedule(data.schedules)
          return data
        },
      })
    },
    refetchOnWindowFocus : false,
    retry : 2,
  })

  const GetProfileQuery = useQuery({
    queryKey: ["profile_data"],
    queryFn: (props) => {
      return FetchProfile();
    },
    refetchOnWindowFocus: false,
    retry: 2,
  });

  const AddScheduleQuery = useMutation({
    mutationFn: (props) => {
      toast.loading("Processing schedule")
      return AddGroupSchedule({
        props,
        callback : (data) => {
          ReformatScheduleBaru(data.schedule)
          setGroupSchedule([...groupSchedule, data.schedule])
          return data
        }
      })
    },
    retry : 2,
    onError : (error) => {
      toast.dismiss()
      onError(error)
    },
    onSuccess : (data) => {
      toast.dismiss()
      toast.success(data.message)
      setPage("calendar")
    },
  })

  const DeleteScheduleQuery = useMutation({
    mutationFn: (props) => {
      toast.loading("Deleting schedule")
      return DeleteGroupSchedule({
        props,
        callback : (data) => {
          //console.log(groupSchedule)
          //console.log(props.schedule_id)
          const newSchedulesFiltered = groupSchedule.filter((value) => {
            return value._id !== props.schedule_id
          })
          //console.log(newSchedulesFiltered)
          setGroupSchedule([...newSchedulesFiltered])
          return data
        }
      })
    },
    retry : 0,
    onError : (error) => {
      //console.log(error)
      onError(error)
    },
    onSuccess : (data) => {
      toast.dismiss()
      toast.success(data.message)
    },
  })

  const RejectScheduleQuery = useMutation({
    mutationFn: (props) => {
      toast.loading("Rejecting schedule")
      return RejectGroupSchedule({
        props,
        callback : (data) => {
          const findInState = groupSchedule.findIndex((value) => {
            value._id == data.schedule._id
          })
          if(findInState != -1) {
            const newSchedulesFiltered = [...groupSchedule]
            newSchedulesFiltered[findInState].group_data.member_joining = newSchedulesFiltered[findInState].group_data.member_joining.filter((value)=> value._id != GetProfileQuery?.data?._id  )
            setGroupSchedule([...newSchedulesFiltered])
          }
          return data
        }
      })
    },
    retry : 0,
    onError : (error) => {
      //console.log(error)
      onError(error)
    },
    onSuccess : (data) => {
      toast.dismiss()
      toast.success(data.message)
    },
  })



  useEffect(() => {
    if (FetchGroupDetailQuery.isError) {
      console.log("ERROR 401");
      router.replace("/group");
    }
  }, [FetchGroupDetailQuery, router]);

  const handleDelete = (schedule) => {
    // TODO: Integrate group schedule deletion
    //console.log(`Delete group schedule with id ${schedule._id}`);
    console.log("JALAN", schedule)
    DeleteScheduleQuery.mutate({schedule_id : schedule._id, group_id : id})
  };

  const handleReject = (schedule) => {
    // TODO: Integrate group schedule deletion
    //console.log(`Delete group schedule with id ${schedule._id}`);
    console.log("JALAN")
    RejectScheduleQuery.mutate({schedule_id : schedule._id, group_id : id})
  };

  if (FetchGroupDetailQuery.isLoading) {
    return (
      <div className="flex w-full items-center justify-center">Loading...</div>
    );
  } else if (FetchGroupDetailQuery.isError) {
    return (
      <div className="flex w-full items-center justify-center">
        401 Not Accessible
      </div>
    );
  } else
    return (
      <CalendarSidebar
        selectedWeek={selectedWeek}
        setSelectedWeek={setSelectedWeek}
        schedules={groupSchedule.filter((schedule) => !schedule.is_user_owned)}
        className={page !== "calendar" ? "max-md:hidden" : ""}
      >
        {/* Back Button */}
        <div className="relative z-30 flex items-center justify-between px-10 py-6 shadow-md">
          {page === "calendar" ? (
            <>
              <Link href="/group" className="flex items-center text-blue-200">
                <span className="text-[50px]">
                  <BiChevronLeft />
                </span>
                <span className="text-2xl">Back</span>
              </Link>
              <Button onClick={() => setPage("add")}>Add Schedule</Button>
            </>
          ) : (
            <>
              <button
                className="flex items-center text-blue-200 outline-0"
                onClick={() => setPage("calendar")}
              >
                <span className="text-[50px]">
                  <BiChevronLeft />
                </span>
                <span className="text-2xl">Back</span>
              </button>
            </>
          )}
        </div>
        {/* Content */}
        {page === "calendar" && (
          <GroupPageCalendar
            group={FetchGroupDetailQuery.data}
            setPage={setPage}
            schedules={groupSchedule}
            start_date={selectedWeek.from}
            onDelete={handleDelete}
            onReject={handleReject}
            ProfileUser={GetProfileQuery.data}
          />
        )}
        {page === "details" && (
          <GroupPageDetails
            group={FetchGroupDetailQuery.data}
            setPage={setPage}
          />
        )}
        {page === "add" && (
          <GroupPageAdd
            group={FetchGroupDetailQuery.data}
            schedules={groupSchedule} AddSchedule={AddScheduleQuery}
          />
        )}
      </CalendarSidebar>
    );
}
