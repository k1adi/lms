import DashboardLayout from "@/Layouts/DashboardLayout";

const Observation = ({ assignment }) => {
  console.log(assignment, 'Observation');
}

Observation.layout = (page) => (
  <DashboardLayout title='Input Observation' children={page} />
);

export default Observation;