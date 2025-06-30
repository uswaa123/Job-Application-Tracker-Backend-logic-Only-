let Job_Application = [];

const simulateApi = (response, delay = 500) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(response), delay);
  });
};


const createjob = async (company, positions, status, date_Applied) => {
  if (!company || !positions || !status || !date_Applied) {
    throw new Error("All fields are required.");
  }

  const id = Date.now().toString();
  const newjob = { id, company, positions, status, date_Applied };
  Job_Application.push(newjob);
  return simulateApi(newjob);
};


const getalljobs = async () => {
  return simulateApi([...Job_Application]);
};


const getjobByID = async (id) => {
  const job = Job_Application.find((job) => job.id === id);
  if (!job) throw new Error("Job not found.");
  return simulateApi(job);
};

const update_Job = async (id, update_field) => {
  const index = Job_Application.findIndex((job) => job.id === id);
  if (index === -1) throw new Error("Job not found for update.");

  Job_Application[index] = {
    ...Job_Application[index],
    ...update_field,
  };

  return simulateApi(Job_Application[index]);
};

const deletejob = async (id) => {
  const index = Job_Application.findIndex((job) => job.id === id);
  if (index === -1) throw new Error("Job not found for delete.");

  const deleted = Job_Application.splice(index, 1)[0];
  return simulateApi(deleted);
};

const run = async () => {
  try {
    const job1 = await createjob("Netsol", "AI engineer", "Applied", "12-09-2024");
    const job2 = await createjob("Educative", "Backend engineer", "Selected", "12-09-2024");

    console.log("All jobs:\n", await getalljobs());

    const one = await getjobByID(job1.id);
    console.log("\n Job by ID:\n", one);

    const updated = await update_Job(job1.id, { status: "Rejected" });
    console.log("\n Updated Job:\n", updated);

    const deleted = await deletejob(job2.id);
    console.log("\n Deleted Job:\n", deleted);

    console.log("\n Final Job List:\n", await getalljobs());
  } catch (err) {
    console.error(" Error:", err.message);
  }
};

run();
