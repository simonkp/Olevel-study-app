import { UserRole } from "@prisma/client";

export const isParent = (role?: UserRole) => role === "PARENT";
export const isChild = (role?: UserRole) => role === "CHILD";
