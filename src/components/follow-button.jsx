import { getUser } from "@/services/auth.service";

export default function FollowButton({ user, onFollowChange }) {

    const currentUser = getUser();

    if (currentUser.user_id === user.user_id) {
        return null;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
            <button
                onClick={onFollowChange}
                className={`text[15px] font-medium w-full py-1.5 rounded-lg cursor-pointer transition-all duration-200 ${user.following
                    ? "border border-black/20"
                    : "bg-black text-white"
                    }`}
            >
                {user.following ? "Following" : "Follow"}
            </button>

            <button
                className="text[15px] font-medium w-full py-1.5 rounded-lg cursor-pointer border border-black/20"
            >
                Mention
            </button>
        </div>
    );
}