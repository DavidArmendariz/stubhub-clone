# Stubhub clone

## (Optional) Local development with GCloud

- Create a k8s cluster inside Kubernetes Engine
- Enable Google Cloud Build API
- Log in: `gcloud auth login`
- Initialize GCloud: `gcloud init`
- Install the GCloud context: `gcloud container clusters get-credentials <cluster_name>`

Check now that you are using the GCloud context: `kubectl config current-contexts`.
To view all the contexts available, run `kubectl config get-contexts` and to change to
another context, run `kubectl config use-context <cluster_name>`.

Then, make sure your `skaffold.yaml` file looks something like this:

```yaml
apiVersion: skaffold/v2alpha3
kind: Config
deploy:
  kubectl:
    manifests:
      - ./infra/k8s/*
build:
  googleCloudBuild:
    projectId: <project_id>
  artifacts:
    - image: us.gcr.io/<project_id>/auth
      context: auth
      docker:
        dockerfile: Dockerfile
      sync:
        manual:
          - src: "src/**/*.ts"
            dest: .
```

> Important: Be sure to rename all of the images inside `/infra/k8s/`.

Now, follow the instructions on: <https://kubernetes.github.io/ingress-nginx/deploy/>
to setup `ingress-nginx` on our Google Cloud Cluster. This will create a Load Balancer automatically for you.

Finally, run `skaffold dev`.
