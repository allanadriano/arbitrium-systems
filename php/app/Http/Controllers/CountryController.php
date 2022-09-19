<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;
use Illuminate\Http\Request;

class CountryController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        try {
            $keyword = $request->get('keyword');
            $page = $request->get('page', 1);
            $limit = $request->get('limit', 15);

            if($page === 1) {
                $offset = 0;
            } else {
                $offset = $limit * ($page - 1);
            }

            $apiClient = env("API_URL");

            $response = \Http::withOptions(['verify' => false])
                ->get("{$apiClient}/countries",
                [
                    'q' => $keyword,
                    'region' => $request->get('region'),
                    'offset' => $offset,
                    'limit' => $limit,
                    'envelope' => false,
                ]);

            $responseData = $response->json();

            if (!empty($responseData['data'])) {
                $meta = [
                    'previous' => $page > 1 ? $page - 1 : 1,
                    'next' => $page + 1,
                ];
            }
            return [
                'data' => $response->json(), 'meta' => $meta ?? []
            ];
        } catch(Throwable $e) {
            return $e;
        }
    }
}
