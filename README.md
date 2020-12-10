# Stubhub clone

## Local Development

Make sure to have `minikube` installed.

- Run `minikube start`
- Follow the instructions to install `ingress-nginx`: <https://kubernetes.github.io/ingress-nginx/deploy/#minikube>
- Run `minikube ip` and take note of it
- Modify `/etc/hosts` with the following:

```txt
<your_minikube_ip> ticketing.dev
```

`ticketing.dev` is arbitrary, you can put whatever you want.

- Run `skaffold dev`

## Ingress nginx namespace issue

In minikube the ingress addon is installed in the namespace kube-system instead of ingress-nginx.
We have to expose a deployment of `ingress-nginx-controller` like this:

```zsh
kubectl expose deployment ingress-nginx-controller --target-port=80 --type=NodePort -n kube-system
```

You can verify that the service got created with: `kubectl get services -n kube-system`

Now we can make use of this URL to communicate with ingress-nginx inside of our NextJS app: `http://ingress-nginx-controller.kube-system.svc.cluster.local/endpoint`

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
          - src: 'src/**/*.ts'
            dest: .
```

> Important: Be sure to rename all of the images inside `/infra/k8s/`.

Now, follow the instructions on: <https://kubernetes.github.io/ingress-nginx/deploy/>
to setup `ingress-nginx` on our Google Cloud Cluster. This will create a Load Balancer automatically for you.

Finally, run `skaffold dev`.
