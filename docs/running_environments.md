# Running / Environments

## Running Krews

To run Krews as built as an executable, use:

`java -jar my-app.jar --on google --config path/to/my-config.conf`

The following is a complete list of arguments for Krews applications.

| Name |  Description |  Required |
|---|---|---|
| `--on` | Execution environment. See below for all types and explanations. | yes |
| `--conf` | Configuration file. See [configurations section](config.md) for more. | yes |

## Google Cloud

Krews uses the Google Cloud Genomics Pipelines API to run on Google Cloud. In a nutshell, this API is just a 
service that creates custom VMs on-the-fly to run docker containers. Our implementation stores files on
Google Cloud Storage.

Krews actually has two different ways it can run on Google Cloud, directed locally and directed remotely 
in the cloud.

### Remote Execution

When Krews runs in remote execution mode on Google Cloud, your Krews application executable and configuration are 
copied into Google Cloud Storage, and the Pipelines API is used to spin up a machine to download and run your Krews 
application in the cloud.

<div class="img-container">
    <img src="../img/krews_google_remote.png" />
</div>

To run on Google Cloud in remote execution mode use:

`java -jar my-app.jar --on google --config path/to/my-config.conf`

### Local Execution

When Krews run in local execution mode, keep in mind that the application runs for the entire duration of your 
workflow and must be uninterrupted. You probably do not want to do this on a laptop.

<div class="img-container">
    <img src="../img/krews_google_local.png" />
</div>

To run on Google Cloud in locally directed mode use:

`java -jar my-app.jar --on google-local --config path/to/my-config.conf`

## Slurm

Krews' [Slurm](https://slurm.schedmd.com/) Executor runs on compute clusters as Slurm 
[sbatch](https://slurm.schedmd.com/sbatch.html) Jobs. Each job is run using [Singularity](https://singularity.lbl.gov/), 
which must be installed on every Slurm worker node. Files are stored on an NFS mounted directory accessible to your
Krews application and the jobs running on Slurm worker nodes.

krews does not need to be run on a Slurm head node. It just needs to be able to ssh into one without using a password.
For more on this see [configs](../config/#slurm-execution-specific).

To run on Slurm use:

`java -jar my-app.jar --on slurm --config path/to/my-config.conf`

## Local Docker

Krews' Local Docker Executor runs all jobs on Docker running on the same machine as Krews. It stores files on any 
given locally accessible file system directory.

To run locally use:

 `java -jar my-app.jar --on local --config path/to/my-config.conf`