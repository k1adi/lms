import DashboardLayout from "@/Layouts/DashboardLayout";

const Edit = ({ tes }) => {
  console.log(tes);
}

Edit.layout = (page) => (
  <DashboardLayout title='Tes Edit' children={page} />
)

export default Edit;