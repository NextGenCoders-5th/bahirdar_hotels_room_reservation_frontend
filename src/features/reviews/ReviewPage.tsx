import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate, useParams } from "react-router-dom";
import { useGetBookingByIdQuery } from "@/redux/api/bookingApi";
import { useReviewRoomMutation } from "@/redux/api/reviewApi";
import toast from "react-hot-toast";
import { FaStar } from "react-icons/fa6";

export interface IReview {
    hotel?: string;
    rating: number;
    comment: string;
}

export default function RoomReview() {

    const navigate = useNavigate();
    const [rating, setRating] = useState(0);
    const { bookingId } = useParams<{ bookingId: string }>();
    const { data: { data: booking } = {}, } = useGetBookingByIdQuery(bookingId as string);
    const [reviewRoom, { isLoading }] = useReviewRoomMutation()
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<IReview>();



    const [submittedReview, setSubmittedReview] = useState<IReview | null>(null);

    const onSubmit = (data: IReview) => {
        reviewRoom({
            hotel: booking?.hotel._id as string,
            rating: rating,
            comment: data.comment,
        }).unwrap().then(() => {
            setSubmittedReview({
                hotel: booking?.hotel._id as string,
                rating: rating,
                comment: data.comment,
            });
            reset();
            toast.success("Review submitted successfully");
            navigate(-1);
        }).catch((error) => {
            if ('data' in error)
            {
                const { message } = error.data as { message: string }
                toast.error(message || "Failed to submit review, try again later");
            }
            else
            toast.error("Failed to submit review, try again later");
        });
    };

    return (
        <div className="flex flex-col items-stretch md:flex-row justify-center gap-4 min-h-[60vh] bg-gray-100 p-4">
            <Card className="w-full bg-white shadow-lg rounded-2xl p-6">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-gray-800">Review a hotel</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                        <div>
                            <label className="block text-gray-700 font-medium">Rating *</label>
                            <div className="flex space-x-1 ">
                                {[1, 2, 3, 4, 5].map((value) => (
                                    <FaStar
                                        key={value}
                                        size={24}
                                        className={`cursor-pointer ${value <= rating ? "text-yellow-500" : "text-gray-300"}`}
                                        onClick={() => setRating(value)}
                                    />
                                ))}
                            </div>
                            <input type="hidden" {...register("rating", { required: "Rating is required" })} value={rating} />
                            {errors.rating && <p className="text-red-500 text-sm">{errors.rating.message}</p>}
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium">Comment</label>
                            <Textarea className="outline-none h-32 border focus:border-accent-500" {...register("comment", { required: "Comment is required" })} placeholder="Write your review..." />
                            {errors.comment && <p className="text-red-500 text-sm">{errors.comment.message}</p>}
                        </div>
                        <Button disabled={isLoading} type="submit" className="w-full bg-accent-500/90 hover:bg-accent-500 text-white font-bold py-2 rounded-lg">Submit Review</Button>
                    </form>

                    {submittedReview && (
                        <div className="mt-6 p-4 border border-gray-300 rounded-lg bg-gray-50">
                            <h3 className="text-lg font-semibold text-gray-800">Submitted Review</h3>
                            {submittedReview.hotel && <p><strong className="text-slate-700">Hotel:</strong> {submittedReview.hotel}</p>}
                            <p><strong className="text-slate-700">Rating:</strong> {submittedReview.rating} / 5</p>
                            <p><strong className="text-slate-700">Comment:</strong> {submittedReview.comment}</p>
                        </div>
                    )}
                </CardContent>
            </Card>
            <Card className="w-full bg-white shadow-lg rounded-2xl p-6">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-gray-800">Room Detail</CardTitle>
                </CardHeader>
                <CardContent>

                    <div className="rounded border p-4 shadow-md">
                        <h2 className="mb-2 text-xl font-bold">Hotel Details</h2>
                        <div className="flex flex-col text-slate-600 gap-2 p-2">
                            <div className="flex items-stretch justify-stretch">
                                <img
                                    src={booking?.hotel?.imageCover}
                                    alt="Room"
                                    className="mb-2 h-36 w-full object-cover"
                                />
                            </div>
                            <div className="flex flex-col">
                                <p>
                                    <strong className="text-slate-700">Hotel Name:</strong> {booking?.hotel.name}
                                </p>
                                <p>
                                    <strong className="text-slate-700">Description:</strong> {booking?.hotel.description}
                                </p>
                                <p className="flex items-center gap-2">
                                    <strong className="text-slate-700">Hotel Start:</strong>
                                    <span className="flex">
                                        {[1, 2, 3, 4, 5].map((value) => (
                                            <FaStar
                                                key={value}
                                                size={24}
                                                className={`cursor-pointer ${value <= +(booking?.hotel.hotelStar || rating) ? "text-yellow-500" : "text-gray-300"}`}
                                                onClick={() => setRating(value)}
                                            />
                                        ))}
                                    </span>
                                </p>
                                <p>
                                    <strong className="text-slate-700">Min Price per Night:</strong> ${booking?.hotel.minPricePerNight}
                                </p>
                                <p>
                                    <strong className="text-slate-700">Facilities:</strong> {booking?.hotel.facilities.join(", ")}
                                </p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
