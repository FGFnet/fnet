
export type FgRole = "Admin" | "Active" | "OB"

export type FG = {
    id: number,
    name: string,
    student_id: string,
    campus: string,
    role: FgRole,
}