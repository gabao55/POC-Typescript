type ResponsibleEntity = {
    id: number,
    name: string,
    token: string
}

type Responsible = Omit<ResponsibleEntity, "id">;

export { ResponsibleEntity, Responsible };